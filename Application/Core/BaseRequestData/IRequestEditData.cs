/*
 * @Author: CollapseNav
 * @Date: 2019-12-30 22:15:28
 * @LastEditors: CollapseNav
 * @LastEditTime: 2020-03-04 18:44:09
 * @Description: 
 */
using System;
using System.Linq.Expressions;
using Repository.Core;
using Repository.Domain;

namespace Application.Core.BaseRequestData {
    public interface IRequestEditData<T> where T : BaseEntity {
        Expression<Func<T, T>> GetConvertExpressions ();
    }
}