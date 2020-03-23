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
    public class ShareFileController : ControllerBase {
        private readonly UserFileApplication app;
        private readonly UserDataApplication user;
        private readonly IConfiguration config;
        private readonly string DirectoryPath;
        public ShareFileController (UserFileApplication _app, UserDataApplication _user) {
            user = _user;
            app = _app;
            var builder = new ConfigurationBuilder ().SetBasePath (Directory.GetCurrentDirectory ()).AddJsonFile ("appsettings.json");
            config = builder.Build ();
            DirectoryPath = Directory.GetCurrentDirectory () + config["FileStore"];
        }

        [HttpPost, Route ("[action]")]
        public IActionResult GetShareFiles (ReqFindPageShareFiles data) {
            // var item = app.GetFilesById (id);
            var items = app.GetFilesWithoutFolder (data, out int total).ToArray ();
            return Ok (new {
                max = total,
                    files = items
            });
        }

        [HttpPost, Route ("[action]")]
        public IActionResult ShareFolder (ReqEditShareFolder data) {
            return Edit (data);
        }

        [HttpPost, Route ("[action]")]
        public IActionResult ShareFile (ReqEditShareFile data) {
            return Edit (data);
        }

        private IActionResult Edit (IRequestEditData<Repository.Domain.FileInfo> data) {
            string mes;
            if ((mes = app.UpdateFileInfo (data)) == "Success")
                return Ok (true);
            return BadRequest (mes);
        }
    }
}