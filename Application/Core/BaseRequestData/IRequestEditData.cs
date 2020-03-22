/*
 * @Author: CollapseNav
 * @Date: 2019-12-30 22:15:28
 * @LastEditors: CollapseNav
 * @LastEditTime: 2020-03-22 15:01:12
 * @Description: 
 */
using System;
using System.Linq.Expressions;
using Repository.Core;
using Repository.Domain;

namespace Application.Core.BaseRequestData {
    /// <summary>
    /// 主要用作 update 操作
    /// </summary>
    public interface IRequestEditData<T> where T : BaseEntity {
        string Id { get; set; }
        /// <summary>
        /// update 中 entity 部分
        /// </summary>
        /// <returns>
        /// 返回一个关于 “修改哪些字段” 的表达式
        /// 由于使用了 Z.EntityFramework.Plus 
        /// 所以只能这样写了
        /// </returns>
        Expression<Func<T, T>> GetConvertExpressions ();
        /// <summary>
        /// update 中的 where 部分
        /// </summary>
        /// <returns>返回一个 lambda 表达式</returns>
        Expression<Func<T, bool>> GetWhereExpression ();
    }
}