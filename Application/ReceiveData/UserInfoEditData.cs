/*
 * @Author: CollapseNav
 * @Date: 2019-12-30 22:15:28
 * @LastEditors: CollapseNav
 * @LastEditTime: 2020-03-04 00:58:21
 * @Description: 
 */
using System;
using System.Linq.Expressions;
using Application.Core.BaseReceiveData;
using Repository.Domain;

namespace Application.ReceiveData {
    public class UserInfoEditData : IBaseEditData {
        public string UserAccount { get; set; }
        public string UserName { get; set; }
        public string UserId { get; set; }
        public string Gender { get; set; }
        public string Age { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Remark { get; set; }

        public Expression<Func<UserDataInfo, UserDataInfo>> GetConvertExpressions () {
            return u => new UserDataInfo {
                UserAccount = UserAccount,
                UserName = UserName,
                ChangedBy = UserId,
                Gender = Gender,
                Age = int.Parse (Age),
                EmailAddress = Email,
                Phone = Phone,
                Remark = Remark
            };
        }
    }
}