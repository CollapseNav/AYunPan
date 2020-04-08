/*
 * @Author: CollapseNav
 * @Date: 2020-04-04 22:15:13
 * @LastEditors: CollapseNav
 * @LastEditTime: 2020-04-08 15:34:31
 * @Description:
 */
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { UserFile, FileTypes } from 'app/unit/userFiles';
import { UserFilesService } from 'app/services/userfiles/userFiles.service';
import { FileConfig } from './fileconfig';
import { SharefilesService } from 'app/services/sharefiles/sharefiles.service';

@Component({
  selector: 'app-filecom',
  templateUrl: './filecom.component.html',
})
export class FilecomComponent implements OnInit, OnDestroy {

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

  ngOnDestroy() {
    if (this.mainConfig.body.usePage) {
      this.mainConfig.body.pageConfig = {
        total: 0,
        index: 1,
        size: 10,
        maxSize: 5,
        maxIndex: 1,
        asc: true,
        batch: 1,
        pageData: this.mainConfig.body.pageConfig.pageData
      }
    }
    console.log('destory')
  }

  initShareData(files: UserFile[]) {
    const sharedlist: UserFile[] = [];
    if (files == null) {
      return null;
    }
    files.filter(item => item.isShared === '1' && item.isDeleted === '0').forEach(item => {
      if (item.fileTypes === FileTypes.folder) {
        item.fileContains = this.initShareData(item.fileContains);
      }
      sharedlist.push(item);
    });
    files.filter(item => item.isShared === '0' && item.isDeleted === '0' && item.fileTypes === FileTypes.folder)
      .forEach(item => {
        if (item.fileContains !== null) {
          this.initShareData(item.fileContains).forEach(f => {
            sharedlist.push(f);
          })
        }
      })
    return sharedlist;
  }

  initTrashData(files: UserFile[]) {
    const trashlist: UserFile[] = [];
    if (files == null) {
      return null;
    }
    files.filter(item => item.isDeleted === '1').forEach(item => {
      if (item.fileTypes === FileTypes.folder) {
        item.fileContains = this.initTrashData(item.fileContains);
      }
      trashlist.push(item);
    });
    files.filter(item => item.isDeleted === '0' && item.fileTypes === FileTypes.folder)
      .forEach(item => {
        if (item.fileContains !== null) {
          this.initTrashData(item.fileContains).forEach(f => {
            trashlist.push(f);
          })
        }
      })
    return trashlist;
  }

  addToMyFile(file: UserFile) {
    this.fileService.files.fileContains.push(file);
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

  initStoreData() {
    // 拿到所有的文件目录数据
    if (this.fileService.getFiles() == null) {
      this.fileService.getUserFiles().subscribe(item => {
        this.storeData = item;
        this.fileService.files = this.storeData;
      });
    } else {// 做这个else主要是为了减少请求的次数，把事情都在客户端做掉
      this.storeData = this.fileService.getFiles();
    }
  }

  initTableData() {
    switch (this.mainConfig.body.usd) {
      case 'userfile': {
        this.tableData = this.storeData.fileContains;
        break;
      }
      case 'sharefile': {
        this.tableData = this.initShareData(this.storeData.fileContains);
        break;
      }
      case 'trashfile': {
        this.tableData = this.initTrashData(this.storeData.fileContains);
        break;
      }
    }
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
