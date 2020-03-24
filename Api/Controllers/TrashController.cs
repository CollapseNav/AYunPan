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
    public class TrashController : ControllerBase {
        private readonly UserFileApplication app;
        private readonly UserDataApplication user;
        private readonly IConfiguration config;
        private readonly string DirectoryPath;
        public TrashController (UserFileApplication _app, UserDataApplication _user) {
            user = _user;
            app = _app;
            var builder = new ConfigurationBuilder ().SetBasePath (Directory.GetCurrentDirectory ()).AddJsonFile ("appsettings.json");
            config = builder.Build ();
            DirectoryPath = Directory.GetCurrentDirectory () + config["FileStore"];
        }

        [HttpPost, Route ("[action]")]
        public IActionResult DeleteFolder (ReqEditDeleteFolder data) {
            return Edit (data);
        }

        [HttpPost, Route ("[action]")]
        public IActionResult DeleteFile (ReqEditDeleteFile data) {
            return Edit (data);
        }

        [HttpPost, Route ("[action]")]
        public IActionResult TrueDeleteFile (ReqFindFile data) {
            var item = app.GetFile (data);
            if (app.CountFile (new ReqFindCountFileByPath { Path = item.FilePath }) == 1) {
                if (System.IO.File.Exists (DirectoryPath + item.FilePath)) {
                    System.IO.File.Delete (DirectoryPath + item.FilePath);
                }
            }
            app.DeleteFile (data);
            return Ok (true);
        }

        private IActionResult Edit (IRequestEditData<Repository.Domain.FileInfo> data) {
            string mes;
            if ((mes = app.UpdateFileInfo (data)) == "Success")
                return Ok (true);
            return BadRequest (mes);
        }
    }
}