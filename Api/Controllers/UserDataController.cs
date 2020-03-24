using Application;
using Application.RequestData;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers {
    [ApiController]
    [Authorize]
    [Route ("api/[controller]")]
    public class UserDataController : ControllerBase {
        private readonly UserDataApplication app;
        public UserDataController (UserDataApplication _app) => app = _app;

        [HttpPost, Route ("[action]")]
        public IActionResult GetUserData (ReqFindUserData data) {
            return Ok (new {
                userData = app.GetUserdata (data),
            });
        }

        [HttpPost, Route ("[action]")]
        public IActionResult EditUserData (ReqEditUserInfoData data) {
            if (!app.EditUserData (data))
                return BadRequest ();
            return Ok (true);
        }
    }
}