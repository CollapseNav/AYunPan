/*
 * @Author: CollapseNav
 * @Date: 2019-12-30 22:15:28
 * @LastEditors: CollapseNav
 * @LastEditTime: 2020-03-17 21:39:23
 * @Description: 
 */
using System;
using System.Linq.Expressions;
using Application.Core.BaseRequestData;
using Repository.Domain;

namespace Application.RequestData {
    public class ReqUserInfoEditData : IRequestEditData<UserDataInfo> {
        public string Id { get; set; }
        public string UserName { get; set; }
        public int Gender { get; set; }
        public string Age { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Remark { get; set; }

        public Expression<Func<UserDataInfo, UserDataInfo>> GetConvertExpressions () {
            return u => new UserDataInfo {
                UserName = UserName,
                ChangedBy = Id,
                Gender = Gender.ToString (),
                Age = int.Parse (Age),
                EmailAddress = Email,
                Phone = Phone,
                Remark = Remark
            };
        }
    }
}