/*
 * @Author: CollapseNav
 * @Date: 2019-12-30 22:15:28
 * @LastEditors: CollapseNav
 * @LastEditTime: 2020-03-22 16:47:18
 * @Description: 
 */
using System;
using System.Linq.Expressions;
using Application.Core.BaseRequestData;
using Repository.Domain;

namespace Application.RequestData {
    /// <summary>
    /// 用于用户的 EditUserData 操作
    /// </summary>
    public class ReqEditUserInfoData : IRequestEditData<UserDataInfo> {
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
        public Expression<Func<UserDataInfo, bool>> GetWhereExpression () {
            return model => model.Id == Id;
        }
    }
}