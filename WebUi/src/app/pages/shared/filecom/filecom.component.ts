/*
 * @Author: CollapseNav
 * @Date: 2020-04-04 22:15:13
 * @LastEditors: CollapseNav
 * @LastEditTime: 2020-04-06 17:30:12
 * @Description:
 */
import { Component, OnInit, Input } from '@angular/core';
import { UserFile } from 'app/unit/userFiles';
import { UserFilesService } from 'app/services/userfiles/userFiles.service';
import { FileConfig } from './fileconfig';
import { SharefilesService } from 'app/services/sharefiles/sharefiles.service';

@Component({
  selector: 'app-filecom',
  templateUrl: './filecom.component.html',
})
export class FilecomComponent implements OnInit {

  @Input() mainConfig: FileConfig;
  // 当前显示的table中的数据，基本上是取自上一个文件夹的filecontains
  tableData: UserFile[] = [];

  pageData: UserFile[] = [];
  // 所有文件
  storeData: UserFile;
  // 面包屑导航需要用
  tableRouter: UserFile[] = [];

  constructor(
    private fileService: UserFilesService,
    private shareService: SharefilesService) {
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
    if (this.mainConfig.body.usePage) {
      this.initPageDate();
    } else {
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
  }
  initTableData() {
    this.tableData = this.storeData.fileContains;
    this.storeData.fileName = 'root';
    this.tableRouter.push(this.storeData);
  }
  initPageDate() {
    const config = this.mainConfig.body.pageConfig;
    config.pageData(config, this.shareService).subscribe(result => {
      config.total = result['max'];
      const ls: UserFile[] = result['files'];
      ls.forEach(item => {
        this.pageData.push(item);
      });
      config.maxIndex = this.pageData.length / config.size;
      if (this.pageData.length % config.size > 0) {
        config.maxIndex += 1;
      }
      config.batch += 1;
      this.indexChange();
    })
  }
  indexChange() {
    const config = this.mainConfig.body.pageConfig;
    const startindex = (config.index - 1) * config.size;
    this.tableData = this.pageData.slice(startindex, startindex + config.size);
  }
}
