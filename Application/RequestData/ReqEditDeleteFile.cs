using System;
using System.Linq.Expressions;
using Application.Core.BaseRequestData;
using Repository.Domain;

namespace Application.RequestData {
    public class ReqEditDeleteFile : IRequestEditData<FileInfo> {
        public string Id { get; set; }
        public int IsDelete { get; set; }

        public Expression<Func<FileInfo, FileInfo>> GetConvertExpressions () {
            return u => new FileInfo {
                IsDeleted = IsDelete,
            };
        }
    }
}