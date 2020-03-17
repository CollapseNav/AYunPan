/*
 * @Author: CollapseNav
 * @Date: 2019-12-30 22:15:28
 * @LastEditors: CollapseNav
 * @LastEditTime: 2020-03-17 21:36:50
 * @Description: 
 */
using System;
using System.Linq.Expressions;
using Repository.Core;
using Repository.Domain;

namespace Application.Core.BaseRequestData {
    public interface IRequestEditData<T> where T : BaseEntity {
        string Id { get; set; }
        Expression<Func<T, T>> GetConvertExpressions ();
    }
}