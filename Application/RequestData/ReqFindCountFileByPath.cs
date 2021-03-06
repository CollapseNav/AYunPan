using System;
using System.Linq.Expressions;
using Application.Core.BaseRequestData;
using Repository.Domain;

namespace Application.RequestData {
    /// <summary>
    /// 最基本的根据 Id 的 find 操作
    /// </summary>
    public class ReqFindCountFileByPath : IRequestFindData<FileInfo> {
        public string Id { get; set; }
        public string Path { get; set; }

        public Expression<Func<FileInfo, bool>> GetWhereExpression () {
            return model => model.FilePath == Path;
        }
    }
}