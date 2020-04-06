import { Observable } from 'rxjs';
import { UserFile } from 'app/unit/userFiles';

/*
 * @Author: CollapseNav
 * @Date: 2020-04-06 15:11:21
 * @LastEditors: CollapseNav
 * @LastEditTime: 2020-04-06 17:31:31
 * @Description:
 */
export interface FileConfig {
  head: {
    hasBreadCrumb: boolean,
    hasNewFileTools: boolean,
    hasSearch: boolean
  },
  body: {
    usd: string,
    tableThead: TheadItem[],
    btnGroup: string[],
    usePage: boolean,
    pageConfig: PageConfig
  }
}


export interface TheadItem {
  content: string;
  per: string;
}

export interface PageConfig {
  total: number,
  size: number,
  index: number,
  asc: boolean,
  batch: number,
  maxSize: number,
  maxIndex: number,
  pageData: (config, service) => Observable<UserFile[]>,
}
