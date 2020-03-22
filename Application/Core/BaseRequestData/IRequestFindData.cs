using System;
using System.Linq.Expressions;
using Repository.Core;
using Repository.Domain;

namespace Application.Core.BaseRequestData {
    public interface IRequestFindData<T> where T : BaseEntity {
        string Id { get; set; }
        /// <summary>
        /// 主要用于 搜索 的部分
        /// </summary>
        /// <returns>一个 lambda 表达式</returns>
        Expression<Func<T, bool>> GetWhereExpression ();
    }
}