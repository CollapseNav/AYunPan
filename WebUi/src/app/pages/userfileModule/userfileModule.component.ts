/*
 * @Author: CollapseNav
 * @Date: 2020-04-02 22:30:37
 * @LastEditors: CollapseNav
 * @LastEditTime: 2020-04-05 18:53:26
 * @Description:
 */
import { Component, OnInit } from '@angular/core';
import { UserFile } from 'app/unit/userFiles';
import { UserFilesService } from 'app/services/userfiles/userFiles.service';
import { saveAs } from 'file-saver';
import { FileConfig } from '../shared/filecom/filecom.component';

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
      btnGroup: ['del', 'share', 'download']
    }
  }

  // 当前显示的table中的数据，基本上是取自上一个文件夹的filecontains
  tableData: UserFile[] = [];
  // 所有文件
  storeData: UserFile;
  // 面包屑导航需要用
  tableRouter: UserFile[] = [];

  constructor(
    private fileService: UserFilesService) {
  }

  downloadFile(id: string) {
    this.fileService.downloadFile(id).subscribe(result => {
      // 我把文件名放到 header 中了
      const filename = result.headers.get('filename');
      const file: Blob = new Blob([result.body]);
      // 这 filesaver 还挺好用的
      saveAs(file, filename);
    })
  }

  search(files: UserFile[]) {
    this.tableData = files;
  }

  // 双击文件夹事件
  onDbClick(item: UserFile) {
    this.tableData = item.fileContains;
  }

  // 面包屑导航
  turnBackTo(item: UserFile) {
    this.tableData = item.fileContains;
  }

  ngOnInit() {
    // // 拿到所有的文件目录数据
    // if (this.fileService.getFiles() == null) {
    //   this.fileService.getUserFiles().subscribe(item => {
    //     this.storeData = item;
    //     this.fileService.files = this.storeData;
    //     this.initTableData();
    //   });
    // } else {// 做这个else主要是为了减少请求的次数，把事情都在客户端做掉
    //   this.storeData = this.fileService.getFiles();
    //   this.initTableData();
    // }
  }
  // initTableData() {
  //   this.tableData = this.storeData.fileContains;
  //   this.storeData.fileName = 'root';
  //   this.tableRouter.push(this.storeData);
  // }
}
