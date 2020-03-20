/*
 * @Author: CollapseNav
 * @Date: 2020-03-01 16:40:22
 * @LastEditors: CollapseNav
 * @LastEditTime: 2020-03-20 18:45:49
 * @Description:
 */
import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserFile, FileTypes } from 'app/unit/userFiles';
import { UserFilesService } from 'app/services/userfiles/userFiles.service';
import { FileUploader, FileItem } from 'ng2-file-upload';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { saveAs } from 'file-saver';

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
    private build: FormBuilder) {
  }

  downloadFile(id: string) {
    this.fileService.downloadFile(id).subscribe(result => {
      const filename = result.headers.get('filename');
      const file: Blob = new Blob([result.body]);
      saveAs(file, filename);
    })
  }

  searchWaitEnter(event: KeyboardEvent) {
    if (event.key.toLowerCase() === 'enter') {
      this.searchFile(event.target);
    }
  }

  searchFile(control) {
    // tslint:disable-next-line:max-line-length
    const searchlist: UserFile[] = this.filterFile(this.folderList.filter(item => item.id === this.tableRouter.slice(-1)[0].id), control.value);
    this.tableData = searchlist;
  }

  clearSearch(control) {
    control.value = '';
    this.turnBackTo(this.tableRouter.slice(-1)[0].id);
  }

  filterFile(folders: UserFile[], filter: string) {
    const list = folders.filter(item => item.fileName.toLowerCase().indexOf(filter) >= 0);
    folders = folders.filter(item => item.fileExt === 'folder')
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
    this.fileService.createNewFolder({ 'folderName': this.newFolderForm.value['folderName'], 'rootId': this.tableRouter.slice(-1)[0].id }).subscribe(result => {
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

  onBe(modal: NgbModal, item: UserFile) {
    this.file = { id: item.id, fileName: item.fileName };
    this.modalService.open(modal, { centered: true });
  }

  deleteFile(modal: NgbActiveModal, id: string) {
    const file = this.tableData.filter(item => item.id === this.file.id)[0];
    this.fileService.deleteFile(id).subscribe(result => {
      if (result) {
        file.isDeleted = '1';
      } else {
        console.log(result);
      }
    })
    modal.close();
  }

  shareFile(modal: NgbActiveModal, id: string) {
    const file = this.tableData.filter(item => item.id === id)[0];
    this.fileService.shareFile(id).subscribe(result => {
      if (result) {
        file.isShared = '1';
      } else {
        console.log(result);
      }
    })
    modal.close();
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
        this.tableData = this.storeData.fileContains;
        this.storeData.fileName = 'root';
        this.tableRouter = [
          { id: this.storeData.id, folder: this.storeData.fileName }
        ];
        this.uploader.options.headers = [
          { name: 'Id', value: localStorage.getItem('Id') },
          { name: 'rootId', value: this.tableRouter.slice(-1)[0].id },
        ];
        this.folderList.push(this.storeData);
      });
    } else {// 做这个else主要是为了减少请求的次数，把事情都在客户端做掉
      this.storeData = this.fileService.getFiles();
      this.tableData = this.storeData.fileContains;
      this.storeData.fileName = 'root';
      this.tableRouter = [
        { id: this.storeData.id, folder: this.storeData.fileName }
      ];
      this.uploader.options.headers = [
        { name: 'Id', value: localStorage.getItem('Id') },
        { name: 'rootId', value: this.tableRouter.slice(-1)[0].id },
      ];
      this.folderList.push(this.storeData);
    }
    // 感觉这个formgroup暂时有点多余
    this.newFolderForm = this.build.group({
      folderName: '',
    });

  }
}
