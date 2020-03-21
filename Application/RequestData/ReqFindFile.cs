using System;
using System.Linq.Expressions;
using Application.Core.BaseRequestData;
using Repository.Domain;

namespace Application.RequestData {
    public class ReqFindFile : IRequestFindData<FileInfo> {
        public string Id { get; set; }

        public Expression<Func<FileInfo, bool>> GetWhereExpression () {
            return model => model.OwnerId == Id;
        }
    }
}