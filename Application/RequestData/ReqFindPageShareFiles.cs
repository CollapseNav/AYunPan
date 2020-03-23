using System;
using System.Linq.Expressions;
using Application.Core;
using Application.Core.BaseRequestData;
using Repository.Domain;

namespace Application.RequestData {
    public class ReqFindPageShareFiles : IRequestFindPageData<FileInfo> {
        public string Id { get; set; }
        public int IsShare { get; set; }
        public int Index { get; set; }
        public int Size { get; set; }
        public bool isAsc { get; set; }

        public bool GetIsAsc () => isAsc;

        public int GetPageIndex () => Index;

        public int GetPageSize () => Size;

        public Expression<Func<FileInfo, bool>> GetWhereExpression () {
            return model => model.Shared == IsShare && (model.FileType != EFileType.folder.ToString ());
        }
    }
}