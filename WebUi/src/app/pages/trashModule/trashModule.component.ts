/*
 * @Author: CollapseNav
 * @Date: 2020-04-05 19:23:20
 * @LastEditors: CollapseNav
 * @LastEditTime: 2020-04-07 20:43:36
 * @Description:
 */
import { Component, OnInit } from '@angular/core';
import { FileConfig } from '../../shared/filecom/fileconfig';

@Component({
  selector: 'app-trashmodule',
  templateUrl: './trashModule.component.html',
})
export class TrashModuleComponent implements OnInit {
  mainConfig: FileConfig = {
    head: {
      hasBreadCrumb: false,
      hasNewFileTools: false,
      hasSearch: true
    },
    body: {
      usd: 'trashfile',
      tableThead: [
        { content: 'Name', per: '35%' },
        { content: 'Type', per: '15%' },
        { content: 'Size', per: '20%' },
        { content: 'AddDate', per: '15%' },
        { content: 'Be', per: '15%' },
      ],
      btnGroup: ['truedel', 'udel'],
      usePage: false,
      pageConfig: null
    }
  }
  constructor() { }

  ngOnInit() {
  }

}
