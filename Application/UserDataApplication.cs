using System;
using Application.RequestData;
using Repository.Domain;
using Repository.Interface;

namespace Application {
    public class UserDataApplication : BaseApplication<UserDataInfo> {
        public UserDataApplication (IRepository<UserDataInfo> user) : base (user) { }

        public UserDataInfo SignIn (ReqSignData sd, out bool IsExist) {
            IsExist = true;
            // 先通过account尝试获取userdatainfo，用于判断是否存在用户
            var item = GetUserDataByASignData (sd);
            if (item == null) {
                IsExist = false;
                return null;
            } // 如果存在，则判断password
            else if (item.PassWord != sd.PassWord) {
                return null;
            }
            return item;
        }

        private UserDataInfo GetUserDataByASignData (ReqSignData sd) {
            UserDataInfo item = null;
            if (!string.IsNullOrEmpty (sd.UserName))
                item = rep.FindSingle (m => m.UserAccount == sd.UserAccount);
            else if (!string.IsNullOrEmpty (sd.UserAccount))
                item = rep.FindSingle (m => m.UserName == sd.UserName);
            return item;
        }

        public bool SignUp (ReqSignData sd) {
            UserDataInfo u = sd.ConvertData ();
            if (GetUserDataByASignData (sd) != null)
                return false;
            u.FolderPath = "/" + u.UserName;
            // 每人默认100mb，我的树莓派比较虚
            u.Cap = (100 * 1024).ToString ();
            try {
                rep.Add (u);
            } catch {
                return false;
            }
            return true;
        }

        public bool EditUserData (ReqUserInfoEditData data) {
            try {
                rep.Update (model => model.Id == data.UserId, data.GetConvertExpressions ());
            } catch (Exception ex) {
                Console.WriteLine (ex.Message);
                return false;
            }
            return true;
        }

    }
}