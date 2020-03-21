using System;
using System.Linq.Expressions;
using Application.Core.BaseRequestData;
using Repository.Domain;

namespace Application.RequestData {
    public class ReqEditShareFile : IRequestEditData<FileInfo> {
        public string Id { get; set; }
        public int IsShare { get; set; }

        public Expression<Func<FileInfo, FileInfo>> GetConvertExpressions () {
            return u => new FileInfo {
                Shared = IsShare,
            };
        }
        public Expression<Func<FileInfo, bool>> GetWhereExpression () {
            return model => model.Id == Id;
        }
    }
}