/*
 * @Author: CollapseNav
 * @Date: 2019-12-30 22:15:28
 * @LastEditors: CollapseNav
 * @LastEditTime: 2020-03-04 00:59:04
 * @Description: 
 */
using Application.Core.BaseReceiveData;
using Repository.Domain;

namespace Application.ReceiveData {
    public class SignData : IBaseData {
        public string UserAccount { get; set; }

        public string UserName { get; set; }

        public string PassWord { get; set; }

        public UserDataInfo ConvertData () {
            return new UserDataInfo { UserAccount = UserAccount, UserName = UserName, PassWord = PassWord };
        }
    }
}