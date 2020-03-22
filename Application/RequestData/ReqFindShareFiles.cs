using System;
using System.Linq.Expressions;
using Application.Core;
using Application.Core.BaseRequestData;
using Repository.Domain;

namespace Application.RequestData {
    public class ReqFindShareFiles : IRequestFindData<FileInfo> {
        public string Id { get; set; }
        public int IsShare { get; set; }

        public Expression<Func<FileInfo, bool>> GetWhereExpression () {
            return model => model.Shared == IsShare && (model.FileType != EFileType.folder.ToString ());
        }
    }
}