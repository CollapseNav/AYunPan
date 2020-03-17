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
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using Repository.Domain;

namespace Api.Controllers {
    [ApiController]
    [Route ("api/[controller]")]
    public class UserFileController : ControllerBase {
        private readonly UserFileApplication app;
        private readonly UserDataApplication user;
        public UserFileController (UserFileApplication _app, UserDataApplication _user) {
            user = _user;
            app = _app;
        }

        [HttpPost, Route ("[action]")]
        public IActionResult UploadFile () {
            var file = Request.Form.Files[0];
            var id = Request.Headers["Id"].ToString ();
            var rootId = Request.Headers["rootId"].ToString ();
            var udata = user.GetFullUserDataById (id);
            var rootFolder = app.GetFileByFileId (rootId);
            // 若用户目录不存在，则新建一个
            if (!Directory.Exists (Directory.GetCurrentDirectory () + udata.FolderPath)) {
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
                Directory.CreateDirectory (Directory.GetCurrentDirectory () + udata.FolderPath);
            }
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
            app.AddFile (data);
            return Ok ();
        }

        [HttpGet, Route ("[action]")]
        public IActionResult GetUserFiles (string id) {
            var item = app.GetFilesById (id);
            return Ok (item);
        }

        [HttpPost, Route ("[action]")]
        public IActionResult CreateNewFolder (ReqNewFolder folder) {
            var root = app.GetFileByFileId (folder.RootId);
            try {
                app.AddFile (new Repository.Domain.FileInfo {
                    FileName = folder.FolderName,
                        FilePath = root.FilePath + '/' + folder.FolderName,
                        MapPath = root.FilePath,
                        FileType = EFileType.folder.ToString (),
                        FileSize = "0",
                        OwnerId = root.OwnerId,
                        OwnerName = root.OwnerName,
                        Shared = 0
                });
            } catch (Exception ex) {
                return BadRequest (ex.Message);
            }
            return Ok ();
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