using System;
using System.Linq.Expressions;
using Application.Core.BaseRequestData;
using Repository.Domain;

namespace Application.RequestData {
    /// <summary>
    /// 根据用户 id 查找用户信息的 find 操作
    /// </summary>
    public class ReqFindUserData : IRequestFindData<UserDataInfo> {
        public string Id { get; set; }

        public Expression<Func<UserDataInfo, bool>> GetWhereExpression () {
            return model => model.Id == Id;
        }
    }
}