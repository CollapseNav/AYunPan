/*
 * @Author: CollapseNav
 * @Date: 2020-04-04 22:15:13
 * @LastEditors: CollapseNav
 * @LastEditTime: 2020-04-05 12:57:32
 * @Description:
 */
import { Component, OnInit, Input } from '@angular/core';
import { TheadItem } from '../table/table.component';
import { UserFile } from 'app/unit/userFiles';
import { UserFilesService } from 'app/services/userfiles/userFiles.service';

export interface FileConfig {
  head: {
    hasBreadCrumb: boolean,
    hasNewFileTools: boolean,
    hasSearch: boolean
  },
  body: {
    usd: string,
    tableThead: TheadItem[],
    btnGroup: string[]
  }
}

@Component({
  selector: 'app-filecom',
  templateUrl: './filecom.component.html',
  styleUrls: ['./filecom.component.scss']
})
export class FilecomComponent implements OnInit {

  @Input() mainConfig: FileConfig;
  // 当前显示的table中的数据，基本上是取自上一个文件夹的filecontains
  tableData: UserFile[] = [];
  // 所有文件
  storeData: UserFile;
  // 面包屑导航需要用
  tableRouter: UserFile[] = [];

  constructor(
    private fileService: UserFilesService) {
  }

  search(files: UserFile[]) {
    this.tableData = files;
  }

  // 双击文件夹事件
  onDbClick(item: UserFile) {// 找到对应的文件夹并且添加到folderlist中
    // const folder = this.tableData.filter(val => val.id === id)[0];
    // this.addToFolderList(folder);
    // this.tableRouter.push(folder);
    this.tableData = item.fileContains;
  }

  // 面包屑导航
  turnBackTo(item: UserFile) {
    this.tableData = item.fileContains;
  }

  ngOnInit() {
    // 拿到所有的文件目录数据
    if (this.fileService.getFiles() == null) {
      this.fileService.getUserFiles().subscribe(item => {
        this.storeData = item;
        this.fileService.files = this.storeData;
        this.initTableData();
      });
    } else {// 做这个else主要是为了减少请求的次数，把事情都在客户端做掉
      this.storeData = this.fileService.getFiles();
      this.initTableData();
    }
  }
  initTableData() {
    this.tableData = this.storeData.fileContains;
    this.storeData.fileName = 'root';
    this.tableRouter.push(this.storeData);
  }
}
