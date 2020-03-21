using System;
using System.Linq.Expressions;
using Application.Core.BaseRequestData;
using Repository.Domain;

namespace Application.RequestData {
    public class ReqEditShareFolder : IRequestEditData<FileInfo> {
        public string Id { get; set; }
        public string Path { get; set; }
        public int IsShare { get; set; }

        public Expression<Func<FileInfo, FileInfo>> GetConvertExpressions () {
            return u => new FileInfo {
                Shared = IsShare,
            };
        }
        public Expression<Func<FileInfo, bool>> GetWhereExpression()
        {
            throw new NotImplementedException();
        }
    }
}