using System;
using System.Linq.Expressions;
using Application.Core.BaseRequestData;
using Repository.Domain;

namespace Application.RequestData {
    /// <summary>
    /// 根据文件的 ownerid 查找某用户文件的 find 方法
    /// </summary>
    public class ReqFindFiles : IRequestFindData<FileInfo> {
        public string Id { get; set; }

        public Expression<Func<FileInfo, bool>> GetWhereExpression () {
            return model => model.OwnerId == Id;
        }
    }
}