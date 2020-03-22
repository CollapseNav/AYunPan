using Application.Core.BaseRequestData;
using Application.Core.BaseResponseData;
using Repository.Domain;

namespace Application.ResponseData {
    /// <summary>
    /// 将 userinfo 转换为 前端 使用的结构
    /// </summary>
    public class ResUserData : IResponseData<UserDataInfo> {
        public string Id { get; set; }
        public string UserAccount { get; set; }
        public string UserName { get; set; }
        public string Age { get; set; }
        public string Gender { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string CreateDate { get; set; }
        public string Remark { get; set; }
        public string Cap { get; set; }
        public string Stored { get; set; }

        public ResUserData (UserDataInfo user) {
            Id = user.Id;
            UserAccount = user.UserAccount;
            UserName = user.UserName;
            Age = user.Age.ToString ();
            Gender = user.Gender;
            Email = user.EmailAddress;
            Phone = user.Phone;
            CreateDate = user.CreateDate.ToString ();
            Remark = user.Remark;
            Cap = user.Cap;
            Stored = user.Stored;
        }
    }
}