using System.IO;
using Application;
using Application.Core.BaseRequestData;
using Application.RequestData;
using Application.ResponseData;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace Api.Controllers
{

    [ApiController]
    [Authorize]
    [Route("api/[controller]")]
    public class ShareFileController : ControllerBase
    {
        private readonly UserFileApplication app;
        private readonly UserDataApplication user;
        private readonly IConfiguration config;
        private readonly string DirectoryPath;
        public ShareFileController(UserFileApplication _app, UserDataApplication _user)
        {
            user = _user;
            app = _app;
            var builder = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json");
            config = builder.Build();
            DirectoryPath = Directory.GetCurrentDirectory() + config["FileStore"];
        }

        [HttpPost, Route("[action]")]
        public IActionResult GetShareFiles(ReqFindPageShareFiles data)
        {
            var items = app.GetFilesWithoutFolder(data, out int total).ToArray();
            return Ok(new
            {
                max = total,
                files = items
            });
        }

        [HttpPost, Route("[action]")]
        public IActionResult AddToMyFile(ReqFindAddShareFile data)
        {
            var item = app.GetFile(data);
            var userdata = user.GetFullUserData(new ReqFindUserData { Id = data.OwnerId });
            item.Id = null;
            item.OwnerId = userdata.Id;
            item.OwnerName = userdata.UserName;
            item.MapPath = userdata.FolderPath;
            item.Shared = 0;
            app.AddFile(item);
            return Ok(new ResUserFiles(item));
        }

        [HttpPost, Route("[action]")]
        public IActionResult ShareFolder(ReqEditShareFile data)
        {
            var item = app.GetFile(new ReqFindFile { Id = data.Id });
            return Edit(new ReqEditShareFolder { Id = item.Id, IsShare = data.IsShare, Path = $"{item.MapPath}/{item.FileName}" });
        }

        [HttpPost, Route("[action]")]
        public IActionResult ShareFile(ReqEditShareFile data)
        {
            return Edit(data);
        }

        private IActionResult Edit(IRequestEditData<Repository.Domain.FileInfo> data)
        {
            string mes;
            if ((mes = app.UpdateFileInfo(data)) == "Success")
                return Ok(true);
            return BadRequest(mes);
        }
    }
}