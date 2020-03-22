using System;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.Security.Claims;
using System.Text;
using Application;
using Application.Core;
using Application.RequestData;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace Api.Controllers {
    [ApiController]
    [Route ("api/[controller]")]
    public class SignController : ControllerBase {
        private readonly UserDataApplication app;
        public SignController (UserDataApplication _app) => app = _app;

        [HttpPost, Route ("[action]")]
        public IActionResult SignUp (ReqSignData data) {
            if (string.IsNullOrEmpty (data.UserAccount) && string.IsNullOrEmpty (data.PassWord))
                return BadRequest ();
            if (!app.SignUp (data))
                return BadRequest ();
            return Ok (true);
        }

        [HttpPost, Route ("[action]")]
        public IActionResult SignIn (ReqSignData data) {
            var item = app.SignIn (data, out bool isExist);
            // 先判断账户是否存在
            if (!isExist)
                return Unauthorized (new { msg = "账户不存在！" });
            // 如果 item 为 null ，则 password 错误
            if (item == null)
                return Unauthorized ();
            // 一个大概不是正的 token
            var claims = new [] {
                new Claim (JwtRegisteredClaimNames.Sub, data.UserAccount)
            };
            var key = new SymmetricSecurityKey (Encoding.UTF8.GetBytes ("It's a .net core spa test."));
            var tokens = new JwtSecurityToken (
                issuer: "DotnetTest",
                audience: "AngualrApp",
                claims : claims,
                notBefore : DateTime.Now,
                expires : DateTime.Now.AddDays (20),
                signingCredentials : new SigningCredentials (key, SecurityAlgorithms.HmacSha256)
            );
            return Ok (new {
                msg = "Success!",
                    token = new JwtSecurityTokenHandler ().WriteToken (tokens),
                    expiration = tokens.ValidTo,
                    userData = item,
            });
        }
    }
}