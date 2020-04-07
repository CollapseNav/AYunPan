/*
 * @Author: CollapseNav
 * @Date: 2020-04-02 22:30:37
 * @LastEditors: CollapseNav
 * @LastEditTime: 2020-04-07 21:00:19
 * @Description:
 */
import { Component, OnInit } from '@angular/core';
import { FileConfig } from '../../shared/filecom/fileconfig';

@Component({
  selector: 'app-userfile',
  templateUrl: './userfileModule.component.html',
})
export class UserfileModuleComponent implements OnInit {

  mainConfig: FileConfig = {
    head: {
      hasBreadCrumb: true,
      hasNewFileTools: true,
      hasSearch: true
    },
    body: {
      usd: 'userfile',
      tableThead: [
        { content: 'Name', per: '35%' },
        { content: 'Type', per: '15%' },
        { content: 'Size', per: '20%' },
        { content: 'AddDate', per: '15%' },
        { content: 'Be', per: '15%' },
      ],
      btnGroup: ['del', 'share', 'download'],
      usePage: false,
      pageConfig: null
    }
  }

  constructor() {
  }

  ngOnInit() {

  }
}
