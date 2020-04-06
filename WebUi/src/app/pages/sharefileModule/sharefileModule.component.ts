/*
 * @Author: CollapseNav
 * @Date: 2020-04-05 18:52:29
 * @LastEditors: CollapseNav
 * @LastEditTime: 2020-04-05 19:03:31
 * @Description:
 */
import { Component, OnInit } from '@angular/core';
import { FileConfig } from '../shared/filecom/filecom.component';

@Component({
  selector: 'app-sharefilemodule',
  templateUrl: './sharefileModule.component.html',
})
export class SharefileModuleComponent implements OnInit {

  privateConfig: FileConfig = {
    head: {
      hasBreadCrumb: true,
      hasNewFileTools: false,
      hasSearch: true
    },
    body: {
      usd: 'sharefile',
      tableThead: [
        { content: 'Name', per: '35%' },
        { content: 'Type', per: '15%' },
        { content: 'Size', per: '20%' },
        { content: 'AddDate', per: '15%' },
        { content: 'Be', per: '15%' },
      ],
      btnGroup: ['del', 'ushare', 'download']
    }
  }

  constructor() { }

  ngOnInit() {
  }

}
