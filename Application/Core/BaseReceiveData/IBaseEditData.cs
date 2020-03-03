/*
 * @Author: CollapseNav
 * @Date: 2019-12-30 22:15:28
 * @LastEditors: CollapseNav
 * @LastEditTime: 2020-03-04 00:55:51
 * @Description: 
 */
using System;
using System.Linq.Expressions;
using Repository.Domain;

namespace Application.Core.BaseReceiveData {
    interface IBaseEditData {
        Expression<Func<UserDataInfo, UserDataInfo>> GetConvertExpressions ();
    }
}