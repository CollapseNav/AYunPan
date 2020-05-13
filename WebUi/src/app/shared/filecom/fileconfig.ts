/*
 * @Author: CollapseNav
 * @Date: 2020-04-06 15:11:21
 * @LastEditors: CollapseNav
 * @LastEditTime: 2020-05-12 12:51:43
 * @Description:
 */
import { Observable } from 'rxjs';
import { UserFile } from 'app/unit/userFiles';

export interface FileConfig {
  /**
   * 表格头部(面包屑、工具栏，搜索栏)
   */
  head: {
    /** 面包屑 */
    hasBreadCrumb: boolean,
    /** 工具栏(新建文件之类的) */
    hasNewFileTools: boolean,
    /** 搜索框 */
    hasSearch: boolean
  },
  /** 表格主体设置 */
  body: {
    /** 表格类型 (u as user , s as share ,d as del) */
    usd: string,
    /** 表头 */
    tableThead: TheadItem[],
    /** 操作按钮 (del,udel,download,share,ushare,truedel,addfile) */
    btnGroup: string[],
    /** 是否使用分页功能 */
    usePage: boolean,
    /** 分页设置 */
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
  /** 传递URL然后在table内部读数据大概会更好一点 */
  pageData: (config, service) => Observable<UserFile[]>,
}
