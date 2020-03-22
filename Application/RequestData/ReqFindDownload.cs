using System;
using System.Linq.Expressions;
using Application.Core.BaseRequestData;
using Repository.Domain;

namespace Application.RequestData {
    /// <summary>
    /// 下载时所使用的 find 操作
    /// 暂时就这样
    /// 后续如果有其他需求
    /// 大概可以改
    /// </summary>
    public class ReqFindDownload : IRequestFindData<FileInfo> {
        public string Id { get; set; }

        public Expression<Func<FileInfo, bool>> GetWhereExpression () {
            return model => model.Id == Id;
        }
    }
}