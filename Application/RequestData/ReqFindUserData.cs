using System;
using System.Linq.Expressions;
using Application.Core.BaseRequestData;
using Repository.Domain;

namespace Application.RequestData {
    public class ReqFindUserData : IRequestFindData<UserDataInfo> {
        public string Id { get; set; }

        public Expression<Func<UserDataInfo, bool>> GetWhereExpression () {
            return model => model.Id == Id;
        }
    }
}