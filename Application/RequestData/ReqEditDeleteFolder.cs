using System;
using System.Linq.Expressions;
using Application.Core.BaseRequestData;
using Repository.Domain;

namespace Application.RequestData {
    public class ReqEditDeleteFolder : IRequestEditData<FileInfo> {
        public string Id { get; set; }
        public string Path { get; set; }
        public int IsDelete { get; set; }

        public Expression<Func<FileInfo, FileInfo>> GetConvertExpressions () {
            return u => new FileInfo {
                IsDeleted = IsDelete,
            };
        }

        public Expression<Func<FileInfo, bool>> GetWhereExpression () {
            return model => model.FilePath.Contains (Path);
        }
    }
}