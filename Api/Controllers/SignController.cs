using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Application;
using Application.RequestData;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;

namespace Api.Controllers {
    [ApiController]
    [Route ("[controller]")]
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
            if (!isExist)
                return Unauthorized ("233");
            if (item == null)
                return Unauthorized ();

            item.PassWord = "";

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
                token = new JwtSecurityTokenHandler ().WriteToken (tokens),
                    expiration = tokens.ValidTo,
                    user = item,
            });
        }

        [HttpPost, Route ("[action]")]
        public IActionResult EditUserData (ReqUserInfoEditData data) {
            if (!app.EditUserData (data))
                return BadRequest ();
            return Ok (true);
        }
    }
}