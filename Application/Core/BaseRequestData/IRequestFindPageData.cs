using System;
using System.Linq.Expressions;
using Repository.Core;

namespace Application.Core.BaseRequestData {
    public interface IRequestFindPageData<T> where T : BaseEntity {
        string Id { get; set; }
        int Index { get; set; }
        int Size { get; set; }
        bool isAsc { get; set; }
        /// <summary>
        /// 主要用于 搜索 的部分(分页搜索)
        /// </summary>
        /// <returns>一个 lambda 表达式</returns>
        Expression<Func<T, bool>> GetWhereExpression ();
        int GetPageIndex ();
        int GetPageSize ();
        bool GetIsAsc ();
    }
}