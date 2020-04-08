using System;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.Security.Claims;
using System.Text;
using Application;
using Application.Core;
using Application.RequestData;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SignController : ControllerBase
    {
        private readonly UserDataApplication app;
        private readonly UserFileApplication file;
        private readonly IConfiguration config;
        private readonly string DirectoryPath;
        public SignController(UserDataApplication _app, UserFileApplication _file)
        {
            app = _app;
            file = _file;
            var builder = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json");
            config = builder.Build();
            DirectoryPath = Directory.GetCurrentDirectory() + config["FileStore"];
        }
        /// <summary>
        /// 注册
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost, Route("[action]")]
        public IActionResult SignUp(ReqSignData data)
        {
            if (string.IsNullOrEmpty(data.UserAccount) && string.IsNullOrEmpty(data.PassWord))
                return BadRequest();
            var item = app.SignUp(data);
            if (item == null)
                return BadRequest();
            var rootFolder = new Repository.Domain.FileInfo
            {
                FileName = item.UserAccount,
                FileType = EFileType.folder.ToString(),
                FileSize = "0",
                OwnerId = item.Id,
                OwnerName = item.UserName,
                FilePath = item.FolderPath,
                MapPath = "",
                Shared = 0,
                ChangedBy = item.Id,
            };
            file.AddFile(rootFolder);
            Directory.CreateDirectory(DirectoryPath + item.FolderPath);
            return Ok(true);
        }
        /// <summary>
        /// 登陆
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost, Route("[action]")]
        public IActionResult SignIn(ReqSignData data)
        {
            var item = app.SignIn(data, out bool isExist);
            // 先判断账户是否存在
            if (!isExist)
                return Unauthorized(new { msg = "账户不存在！" });
            // 如果 item 为 null ，则 password 错误
            if (item == null)
                return Unauthorized();
            // 一个大概不是正的 token
            var claims = new[] {
                new Claim (JwtRegisteredClaimNames.Sub, data.UserAccount)
            };
            // 我觉得key的部分可以尝试放到 appsetting 里面
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("It's a .net core spa test."));
            var tokens = new JwtSecurityToken(
                issuer: "Dotnet+Angular",
                audience: "AYunPan",
                claims: claims,
                notBefore: DateTime.Now,
                expires: DateTime.Now.AddDays(20),
                signingCredentials: new SigningCredentials(key, SecurityAlgorithms.HmacSha256)
            );
            // 我觉得这边返回的数据应该做一些修改
            return Ok(new
            {
                msg = "Success!",
                token = new JwtSecurityTokenHandler().WriteToken(tokens),
                expiration = tokens.ValidTo,
                userData = item,
            });
        }
    }
}