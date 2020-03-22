using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Threading.Tasks;
using Application;
using Application.Core;
using Application.Core.BaseRequestData;
using Application.RequestData;
using Application.ResponseData;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.StaticFiles;
using Microsoft.Extensions.Configuration;

namespace Api.Controllers {
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
            // 从配置中读取 文件存放目录 ，大概不是很好用，后续再改进
            var builder = new ConfigurationBuilder ().SetBasePath (Directory.GetCurrentDirectory ()).AddJsonFile ("appsettings.json");
            config = builder.Build ();
            DirectoryPath = Directory.GetCurrentDirectory () + config["FileStore"];
        }

        [HttpPost, Route ("[action]")]
        public async Task<IActionResult> UploadFile () {
            var file = Request.Form.Files[0];
            // 前端用了一个upload的插件， 只知道用 header 传参是没问题的
            var id = Request.Headers["Id"].ToString ();
            var rootId = Request.Headers["rootId"].ToString ();
            var udata = user.GetFullUserData (new ReqFindUserData { Id = id });
            var rootFolder = app.GetFile (new ReqFindFile { Id = rootId });
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
                if (Directory.Exists (truepath)) {
                    return BadRequest ("当前目录已存在同名文件");
                }
                // 当成功保存文件后添加到数据库
                using FileStream fs = new FileStream (DirectoryPath + "/" + data.FilePath, FileMode.CreateNew);
                await file.CopyToAsync (fs);
                app.AddFile (data);
                return Ok (new ResUserFiles (data));
            } catch (Exception ex) {
                Console.WriteLine (ex.Message);
                return BadRequest ();
            }
        }

        [HttpPost, Route ("[action]")]
        public IActionResult GetUserFiles (ReqFindFiles data) {
            var item = app.GetFiles (data);
            return Ok (item);
        }

        /// <summary>
        /// 由于下载的时候需要多加一个 hearder ，这个可以通过使用不同的 cors 配置解决
        /// </summary>
        [HttpPost, Route ("[action]"), EnableCors ("File")]
        public IActionResult DownloadFile (ReqFindDownload data) {
            var file = app.GetFile (data);
            var ext = file.FileName.Split ('.') [ ^ 1];
            // 不转码的话，碰到中文会有编码问题
            Response.Headers.Add ("FileName",
                System.Web.HttpUtility.UrlEncode (file.FileName, Encoding.UTF8));
            return File (new FileStream (DirectoryPath + file.FilePath, FileMode.Open), new FileExtensionContentTypeProvider ().Mappings['.' + ext], file.FileName);
        }

        [HttpPost, Route ("[action]")]
        public IActionResult CreateNewFolder (ReqFindNewFolder folder) {
            var root = app.GetFile (folder);
            try {
                string folderpath = root.FilePath + '/' + folder.FolderName;
                string truepath = DirectoryPath + folderpath;
                // 感觉同名文件夹这事情可以在前端就做掉
                if (Directory.Exists (truepath)) {
                    return BadRequest ("当前目录已存在同名文件夹");
                }
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
            } catch (Exception ex) {
                return BadRequest (ex.Message);
            }
        }

        #region 此处只是简单的修改一个字段

        [HttpPost, Route ("[action]")]
        public IActionResult ShareFolder (ReqEditShareFolder data) {
            return Edit (data);
        }

        [HttpPost, Route ("[action]")]
        public IActionResult ShareFile (ReqEditShareFile data) {
            return Edit (data);
        }

        [HttpPost, Route ("[action]")]
        public IActionResult DeleteFolder (ReqEditDeleteFolder data) {
            return Edit (data);
        }

        [HttpPost, Route ("[action]")]
        public IActionResult DeleteFile (ReqEditDeleteFile data) {
            return Edit (data);
        }

        private IActionResult Edit (IRequestEditData<Repository.Domain.FileInfo> data) {
            string mes;
            if ((mes = app.UpdateFileInfo (data)) == "Success")
                return Ok (true);
            return BadRequest (mes);
        }
        #endregion
    }
}