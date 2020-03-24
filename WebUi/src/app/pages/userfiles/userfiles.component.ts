/*
 * @Author: CollapseNav
 * @Date: 2020-03-01 16:40:22
 * @LastEditors: CollapseNav
 * @LastEditTime: 2020-03-24 18:06:33
 * @Description:
 */
import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserFile, FileTypes } from 'app/unit/userFiles';
import { UserFilesService } from 'app/services/userfiles/userFiles.service';
import { FileUploader, FileItem } from 'ng2-file-upload';
import { FormGroup, FormBuilder } from '@angular/forms';
import { saveAs } from 'file-saver';
import { ShareFolder } from 'app/unit/shareFolder';
import { ShareFile } from 'app/unit/shareFile';
import { DeleteFile } from 'app/unit/deleteFile';
import { DeleteFolder } from 'app/unit/deleteFolder';
import { SharefilesService } from 'app/services/sharefiles/sharefiles.service';
import { TrashService } from 'app/services/trash/trash.service';

@Component({
  selector: 'app-userfiles',
  templateUrl: './userfiles.component.html',
})
export class UserfilesComponent implements OnInit {
  // 主要定一下table各个col的占比
  tableThead = [
    { content: 'FileName', per: '25%' },
    { content: 'FileType', per: '20%' },
    { content: 'FileSize', per: '20%' },
    { content: 'AddDate', per: '20%' },
    { content: 'Be', per: '15%' },
  ];
  // 可能有点多余的一个formgroup，主要是存一下新建文件夹时输入的名称，后面可能会加点什么东西吧
  newFolderForm: FormGroup;
  // 当前显示的table中的数据，基本上是取自上一个文件夹的filecontains
  tableData: UserFile[] = [];
  // 主要存打开过的文件夹，面包屑导航会用，大概用stack的逻辑会更好，但是，懒
  folderList: UserFile[] = [];
  // 所有文件
  storeData: UserFile;
  // 面包屑导航需要用
  tableRouter = [{ id: '', folder: '' }];
  file = { id: '', fileName: '' };
  uploader: FileUploader;

  constructor(
    private modalService: NgbModal,
    private fileService: UserFilesService,
    private build: FormBuilder,
    private trash: TrashService,
    private share: SharefilesService) {
  }

  //#region  头部工具栏

  searchWaitEnter(event: KeyboardEvent) {
    if (event.key.toLowerCase() === 'enter') {
      this.searchFile(event.target);
    }
  }


  searchFile(control) {
    if (control.value === '') {
      this.turnBackTo(this.tableRouter.slice(-1)[0].id);
      return;
    }
    // tslint:disable-next-line:max-line-length
    const searchlist: UserFile[] = this.filterFile(this.folderList.filter(item => item.id === this.tableRouter.slice(-1)[0].id), control.value);
    this.tableData = searchlist;
  }

  clearSearch(control) {
    control.value = '';
    this.turnBackTo(this.tableRouter.slice(-1)[0].id);
  }

  private filterFile(folders: UserFile[], filter: string) {
    const list = folders.filter(item => item.fileName.toLowerCase().indexOf(filter) >= 0 && item.fileTypes !== FileTypes.folder);
    folders = folders.filter(item => item.fileTypes === FileTypes.folder);
    folders.forEach(item => {
      if (item.fileContains != null) {
        this.filterFile(item.fileContains, filter).forEach(file => {
          list.push(file);
        })
      }
    });
    return list;
  }

  // 新建文件夹
  createNewFolder() {
    // tslint:disable-next-line:max-line-length
    this.fileService.createNewFolder({ 'folderName': this.newFolderForm.value['folderName'], 'Id': this.tableRouter.slice(-1)[0].id }).subscribe(result => {
      this.tableData.push(result);
    })
  }

  // 文件上传部分
  uploadFile(file: FileItem) {
    file.upload();
  }

  openUploadModal(modal) {
    this.modalService.open(modal, { centered: true, size: 'lg' });
  }
  // 上下两个可以合并，但我偏不！
  // 实际上还是有点区别的
  openNewFolder(modal) {
    this.modalService.open(modal, { centered: true });
  }
  //#endregion

  //#region table 方法

  downloadFile(id: string) {
    this.fileService.downloadFile(id).subscribe(result => {
      // 我把文件名放到 header 中了
      const filename = result.headers.get('filename');
      const file: Blob = new Blob([result.body]);
      // 这 filesaver 还挺好用的
      saveAs(file, filename);
    })
  }

  // 就打开modal用的
  onBe(modal: NgbModal, item: UserFile) {
    this.file = { id: item.id, fileName: item.fileName };
    this.modalService.open(modal, { centered: true });
  }

  deleteFile(modal: NgbActiveModal, id: string) {
    const file = this.tableData.filter(item => item.id === id)[0];
    // 文件夹和文件 需要有不同的操作
    if (file.fileTypes === FileTypes.folder) {
      let path = '/' + this.storeData.fileName;
      this.tableRouter.forEach(item => {
        if (item.folder !== 'root') {
          path += '/' + item.folder;
        }
      })
      path += '/' + file.fileName;
      this.trash.deleteFolder(new DeleteFolder(file.id, path, 1)).subscribe(result => {
        if (result) {
          this.setFolderDelete(file);
        }
      })
    } else {
      this.trash.deleteFile(new DeleteFile(file.id, 1)).subscribe(result => {
        if (result) {
          file.isDeleted = '1';
        } else {
          console.log(result);
        }
      })
    }
    modal.close();
  }

  shareFile(modal: NgbActiveModal, id: string) {
    const file = this.tableData.filter(item => item.id === id)[0];
    // 文件夹和文件 需要有不同的操作
    if (file.fileTypes === FileTypes.folder) {
      let path = '/' + this.storeData.fileName;
      this.tableRouter.forEach(item => {
        if (item.folder !== 'root') {
          path += '/' + item.folder;
        }
      })
      path += '/' + file.fileName;
      this.share.shareFolder(new ShareFolder(file.id, path, 1)).subscribe(result => {
        if (result) {
          this.setFolderShare(file);
        }
      })
    } else {
      this.share.shareFile(new ShareFile(file.id, 1)).subscribe(result => {
        if (result) {
          file.isShared = '1';
        } else {
          console.log(result);
        }
      })
    }
    modal.close();
  }

  // 将文件夹里的所有文件都设为 share
  private setFolderShare(folder: UserFile) {
    folder.isShared = '1';
    if (folder.fileContains != null) {
      folder.fileContains.forEach(item => {
        item.isShared = '1';
        if (item.fileTypes === FileTypes.folder) {
          this.setFolderShare(item);
        }
      })
    }
  }

  // 将文件夹里的所有文件都设为 delete
  private setFolderDelete(folder: UserFile) {
    folder.isDeleted = '1';
    if (folder.fileContains != null) {
      folder.fileContains.forEach(item => {
        item.isDeleted = '1';
        if (item.fileTypes === FileTypes.folder) {
          this.setFolderDelete(item);
        }
      })
    }
  }

  // 这边的folderlist用stack的逻辑做可能会简单很多吧，但我懒，暂时不想改了
  private addToFolderList(folder: UserFile) {
    if (this.folderList.filter(item => item.id === folder.id).length > 0) {
      return;
    }
    this.folderList.push(folder);
  }

  // 双击文件夹事件
  onDbClick(id: string) {// 找到对应的文件夹并且添加到folderlist中
    const folder = this.tableData.filter(val => val.id === id)[0];
    this.addToFolderList(folder);
    this.tableRouter.push({ id: folder.id, folder: folder.fileName });
    this.tableData = folder.fileContains;
    this.uploader.options.headers = [
      { name: 'Id', value: localStorage.getItem('Id') },
      { name: 'rootId', value: this.tableRouter.slice(-1)[0].id },
    ];
  }


  //#endregion

  // 面包屑导航
  turnBackTo(id: string) {
    const folder = this.folderList.filter(item => item.id === id)[0];
    this.tableData = folder.fileContains;
    this.tableRouter = this.tableRouter.slice(0, this.tableRouter.findIndex(item => item.id === id) + 1);
  }

  ngOnInit() {
    this.uploader = this.fileService.uploader;
    // 成功之后直接修改客户端的 files，不需要从服务器请求大量数据(这种事情第一次加载的时候做就好了)
    this.uploader.onSuccessItem = (item, res) => {
      const resfile = JSON.parse(res);
      this.tableData.push(resfile);
    }
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
    // 感觉这个formgroup暂时有点多余
    this.newFolderForm = this.build.group({
      folderName: '',
    });
  }
  initTableData() {
    this.tableData = this.storeData.fileContains;
    this.tableRouter = [
      { id: this.storeData.id, folder: 'root' }
    ];
    this.uploader.options.headers = [
      { name: 'Id', value: localStorage.getItem('Id') },
      { name: 'rootId', value: this.tableRouter.slice(-1)[0].id },
    ];
    this.folderList.push(this.storeData);
  }
}
