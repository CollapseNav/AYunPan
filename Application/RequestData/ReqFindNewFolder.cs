using System;
using System.Linq.Expressions;
using Application.Core.BaseRequestData;
using Repository.Domain;

namespace Application.RequestData {
    /// <summary>
    /// 实际上是在新建文件夹时
    /// find 新文件夹所属 文件夹
    /// 的 一种 大概比较多余的操作
    /// </summary>
    public class ReqFindNewFolder : IRequestFindData<FileInfo> {
        public string Id { get; set; }
        public string FolderName { get; set; }

        public Expression<Func<FileInfo, bool>> GetWhereExpression () {
            return model => model.Id == Id;
        }
    }
}