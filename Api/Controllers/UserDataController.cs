using Application;
using Application.RequestData;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [ApiController]
    [Route ("api/[controller]")]
    public class UserDataController : ControllerBase {
        private readonly UserDataApplication app;
        public UserDataController (UserDataApplication _app) => app = _app;

        [HttpGet, Route ("[action]")]
        public IActionResult GetUserData (string id) {
            return Ok (new {
                userData = app.GetUserdataById (id),
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