/*
 * @Author: CollapseNav
 * @Date: 2019-12-30 22:15:28
 * @LastEditors: CollapseNav
 * @LastEditTime: 2020-03-04 00:57:24
 * @Description: 
 */
using Repository.Domain;

namespace Application.Core.BaseReceiveData {
    interface IBaseData {
        UserDataInfo ConvertData ();
    }
}