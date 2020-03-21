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

namespace Api.Controllers
{

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

        [HttpGet, Route ("[action]")]
        public IActionResult GetShareFiles (string id) {
            // var item = app.GetFilesById (id);
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
    }
}