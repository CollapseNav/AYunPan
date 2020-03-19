using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Application;
using Application.Core;
using Application.Core.BaseRequestData;
using Application.RequestData;
using Application.ResponseData;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.StaticFiles;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using Repository.Domain;

namespace Api.Controllers {
    public class test {
        public string id { get; set; }
    }

    [ApiController]
    [Route ("api/[controller]")]
    public class UserFileController : ControllerBase {
        private readonly UserFileApplication app;
        private readonly UserDataApplication user;
        private readonly IConfiguration config;
        private readonly string DirectoryPath;
        public UserFileController (UserFileApplication _app, UserDataApplication _user) {
            user = _user;
            app = _app;
            var builder = new ConfigurationBuilder ().SetBasePath (Directory.GetCurrentDirectory ()).AddJsonFile ("appsettings.json");
            config = builder.Build ();
            DirectoryPath = Directory.GetCurrentDirectory () + config["FileStore"];
        }

        [HttpPost, Route ("[action]")]
        public async Task<IActionResult> UploadFile () {
            var file = Request.Form.Files[0];
            var id = Request.Headers["Id"].ToString ();
            var rootId = Request.Headers["rootId"].ToString ();
            var udata = user.GetFullUserDataById (id);
            var rootFolder = app.GetFileByFileId (rootId);
            // 若用户目录不存在，则新建一个
            if (!Directory.Exists (DirectoryPath + udata.FolderPath)) {
                rootFolder = new Repository.Domain.FileInfo {
                    FileName = udata.UserAccount,
                    FileType = EFileType.folder.ToString (),
                    FileSize = "0",
                    OwnerId = udata.Id,
                    OwnerName = udata.UserName,
                    FilePath = udata.FolderPath,
                    MapPath = "",
                    Shared = 0
                };
                app.AddFile (rootFolder);
                Directory.CreateDirectory (DirectoryPath + udata.FolderPath);
            }
            try {
                var data = new Repository.Domain.FileInfo {
                    FileName = file.FileName,
                    FileType = FileType.ExtMapToType (file.FileName.Split ('.') [ ^ 1]).ToString (),
                    FileSize = file.Length.ToString (),
                    OwnerId = udata.Id,
                    OwnerName = udata.UserName,
                    FilePath = rootFolder.FilePath + "/" + file.FileName,
                    MapPath = rootFolder.FilePath,
                    Shared = 0
                };
                string truepath = DirectoryPath + "/" + data.FilePath;
                if (!Directory.Exists (truepath)) {
                    using FileStream fs = new FileStream (DirectoryPath + "/" + data.FilePath, FileMode.CreateNew);
                    await file.CopyToAsync (fs);
                    app.AddFile (data);
                    return Ok (new ResUserFiles (data));
                } else {
                    return BadRequest ("当前目录已存在同名文件");
                }
            } catch (Exception ex) {
                Console.WriteLine (ex.Message);
                return BadRequest ();
            }
        }

        [HttpGet, Route ("[action]")]
        public IActionResult GetUserFiles (string id) {
            var item = app.GetFilesById (id);
            return Ok (item);
        }

        [HttpPost, Route ("[action]"), EnableCors ("File")]
        public IActionResult DownloadFile (ReqDownload data) {
            var file = app.GetFileByFileId (data.Id);
            var ext = file.FileName.Split ('.') [ ^ 1];
            Response.Headers.Add ("FileName",
                System.Web.HttpUtility.UrlEncode (file.FileName, Encoding.UTF8));
            return File (new FileStream (DirectoryPath + file.FilePath, FileMode.Open), new FileExtensionContentTypeProvider ().Mappings['.' + ext], file.FileName);
        }

        [HttpPost, Route ("[action]")]
        public IActionResult DownloadFile2 (ReqDownload data) {
            var file = app.GetFileByFileId (data.Id);
            var ext = file.FileName.Split ('.') [ ^ 1];
            return Ok (new {
                file = new FileStream (DirectoryPath + file.FilePath, FileMode.Open),
                    ext
            });
        }

        [HttpPost, Route ("[action]")]
        public IActionResult CreateNewFolder (ReqNewFolder folder) {
            var root = app.GetFileByFileId (folder.RootId);
            try {
                string folderpath = root.FilePath + '/' + folder.FolderName;
                string truepath = DirectoryPath + folderpath;
                if (!Directory.Exists (truepath)) {
                    var data = new Repository.Domain.FileInfo {
                        FileName = folder.FolderName,
                        FilePath = folderpath,
                        MapPath = root.FilePath,
                        FileType = EFileType.folder.ToString (),
                        FileSize = "0",
                        OwnerId = root.OwnerId,
                        OwnerName = root.OwnerName,
                        Shared = 0
                    };
                    app.AddFile (data);
                    Directory.CreateDirectory (truepath);
                    return Ok (new ResUserFiles (data) { FileContains = new List<ResUserFiles> () });
                } else {
                    return BadRequest ("当前目录已存在同名文件夹");
                }
            } catch (Exception ex) {
                return BadRequest (ex.Message);
            }
        }

        private IActionResult Edit (IRequestEditData<Repository.Domain.FileInfo> data) {
            string mes;
            if ((mes = app.UpdateFileInfo (data)) == "Success")
                return Ok (true);
            else {
                return BadRequest (mes);
            }
        }

        [HttpPost, Route ("[action]")]
        public IActionResult ShareFile (ReqEditShareFile data) {
            data.IsShare = 1;
            return Edit (data);
        }

        [HttpPost, Route ("[action]")]
        public IActionResult DeleteFile (ReqEditDeleteFile data) {
            data.IsDelete = 1;
            return Edit (data);
        }

        [HttpPost, Route ("[action]")]
        public IActionResult UnShareFile (ReqEditShareFile data) {
            data.IsShare = 0;
            return Edit (data);
        }

        [HttpPost, Route ("[action]")]
        public IActionResult UnDeleteFile (ReqEditDeleteFile data) {
            data.IsDelete = 0;
            return Edit (data);
        }
    }
}