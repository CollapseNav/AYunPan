using System;
using System.Linq.Expressions;
using Application.Core.BaseRequestData;
using Repository.Domain;

namespace Application.RequestData
{
    /// <summary>
    /// 批量修改 share 字段
    /// </summary>
    public class ReqEditShareFolder : IRequestEditData<FileInfo>
    {
        public string Id { get; set; }
        public string Path { get; set; }
        public int IsShare { get; set; }

        public Expression<Func<FileInfo, FileInfo>> GetConvertExpressions()
        {
            return u => new FileInfo
            {
                Shared = IsShare,
            };
        }
        public Expression<Func<FileInfo, bool>> GetWhereExpression()
        {
            return model => model.FilePath.Contains(Path);
        }
    }
}
