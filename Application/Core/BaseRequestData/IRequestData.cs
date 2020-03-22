/*
 * @Author: CollapseNav
 * @Date: 2019-12-30 22:15:28
 * @LastEditors: CollapseNav
 * @LastEditTime: 2020-03-22 14:56:34
 * @Description: 
 */
using Repository.Core;
using Repository.Domain;

namespace Application.Core.BaseRequestData {
    public interface IRequestData<T> where T : BaseEntity {

        /// <summary>
        /// 转为类型 T
        /// </summary>
        T ConvertData ();
    }
}