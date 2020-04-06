/*
 * @Author: CollapseNav
 * @Date: 2020-04-05 18:52:29
 * @LastEditors: CollapseNav
 * @LastEditTime: 2020-04-06 17:32:12
 * @Description:
 */
import { Component, OnInit } from '@angular/core';
import { FileConfig, PageConfig } from '../shared/filecom/fileconfig';
import { SharefilesService } from 'app/services/sharefiles/sharefiles.service';
import { Observable } from 'rxjs';
import { UserFile } from 'app/unit/userFiles';
import { TableConfig } from '../sharedfiles/sharedfiles.component';

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
      btnGroup: ['del', 'ushare', 'download'],
      usePage: false,
      pageConfig: null
    }
  }
  publicConfig: FileConfig = {
    head: {
      hasBreadCrumb: false,
      hasNewFileTools: false,
      hasSearch: false
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
      btnGroup: ['del', 'download'],
      usePage: true,
      pageConfig: {
        total: 0,
        index: 1,
        size: 10,
        maxSize: 5,
        maxIndex: 1,
        asc: true,
        batch: 1,
        pageData: this.test
      }
    }
  }

  test(config: PageConfig, service: SharefilesService): Observable<UserFile[]> {
    return service.getShareFiles(config);
  }

  constructor(private share: SharefilesService) { }

  ngOnInit() {
  }

}
