/*
 * @Author: CollapseNav
 * @Date: 2019-12-30 22:15:28
 * @LastEditors: CollapseNav
 * @LastEditTime: 2020-03-11 17:43:43
 * @Description: 
 */
using Repository.Core;
using Repository.Domain;

namespace Application.Core.BaseResponseData {
    public interface IResponseData<T> where T : BaseEntity {
    }
}