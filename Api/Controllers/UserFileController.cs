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
            var udata = user.GetFullUserDataById (id);
            if (!Directory.Exists (Directory.GetCurrentDirectory () + udata.FolderPath)) {
                app.AddFile (new Repository.Domain.FileInfo {
                    FileName = udata.UserAccount,
                        FileType = EFileType.folder.ToString (),
                        FileSize = "0",
                        OwnerId = udata.Id,
                        OwnerName = udata.UserName,
                        FilePath = udata.FolderPath,
                        MapPath = "",
                        Shared = 0
                });
                Directory.CreateDirectory (Directory.GetCurrentDirectory () + udata.FolderPath);
            }
            var data = new Repository.Domain.FileInfo {
                FileName = file.FileName,
                FileType = FileType.ExtMapToType (file.FileName.Split ('.') [ ^ 1]).ToString (),
                FileSize = file.Length.ToString (),
                OwnerId = udata.Id,
                OwnerName = udata.UserName,
                FilePath = udata.FolderPath + "/" + file.FileName,
                MapPath = udata.FolderPath,
                Shared = 0
            };
            app.AddFile (data);
            return Ok ();
        }

        [HttpGet, Route ("[action]")]
        public IActionResult GetUserFiles (string id) {
            var item = app.GetFilesById (id);
            return Ok (new {
                userFile = item
            });
        }

        [HttpPost, Route ("[action]")]
        public IActionResult CreateNewFolder () {
            return Ok ();
        }
    }
}