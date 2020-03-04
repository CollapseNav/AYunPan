/*
 * @Author: CollapseNav
 * @Date: 2019-12-30 22:15:28
 * @LastEditors: CollapseNav
 * @LastEditTime: 2020-03-04 18:43:04
 * @Description: 
 */
using Application.Core.BaseRequestData;
using Repository.Domain;

namespace Application.RequestData {
    public class ReqSignData : IRequestData<UserDataInfo> {
        public string UserAccount { get; set; }

        public string UserName { get; set; }

        public string PassWord { get; set; }

        public UserDataInfo ConvertData () {
            return new UserDataInfo { UserAccount = UserAccount, UserName = UserName, PassWord = PassWord };
        }
    }
}