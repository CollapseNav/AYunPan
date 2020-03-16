/*
 * @Author: CollapseNav
 * @Date: 2020-03-01 16:40:22
 * @LastEditors: CollapseNav
 * @LastEditTime: 2020-03-16 15:56:13
 * @Description:
 */
import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserFile, FileTypes } from 'app/unit/userFiles';
import { UserFilesService } from 'app/services/userfiles/userFiles.service';
import { FileUploader, FileItem } from 'ng2-file-upload';
import { UploadInput } from 'ngx-uploader';

@Component({
  selector: 'app-userfiles',
  templateUrl: './userfiles.component.html',
})
export class UserfilesComponent implements OnInit {
  tableThead = [
    { content: 'FileName', per: '25%' },
    { content: 'FileType', per: '20%' },
    { content: 'FileSize', per: '20%' },
    { content: 'AddDate', per: '20%' },
    { content: 'Be', per: '15%' },
  ];
  tableData: UserFile[] = [];
  folderList: UserFile[] = [];
  storeData: UserFile;
  tableRouter = [{ id: '', folder: '' }];
  delFile = { id: '', fileName: '' };
  uploader: FileUploader;

  uploadInput: UploadInput;

  constructor(
    private modalService: NgbModal,
    private fileService: UserFilesService) {
    this.uploader = fileService.uploader;
  }

  createNewFolder() {

  }

  uploadFile(file: FileItem) {
    file.withCredentials = false;
    file.upload();
  }

  turnBackTo(id: string) {
    if (id === this.storeData.id) {
      this.tableData = this.storeData.fileContains;
    } else {
      const folder = this.folderList.filter(item => item.id === id)[0];
      this.tableData = folder.fileContains;
    }
    this.tableRouter = this.tableRouter.slice(0, this.tableRouter.findIndex(item => item.id === id) + 1);
  }

  openUploadModal(modal) {
    this.modalService.open(modal, { centered: true, size: 'lg' });
  }

  onDelete(modal: NgbModal, item: UserFile) {
    this.delFile = { id: item.id, fileName: item.fileName };
    this.modalService.open(modal, { centered: true });
  }

  onDelCheck(modal: NgbActiveModal, id: string) {
    this.tableData.splice(this.tableData.findIndex(item => item.id === id), 1);
    modal.close();
  }

  private addToFolderList(folder: UserFile) {
    if (this.folderList.filter(item => item.id === folder.id).length > 0) {
      return;
    }
    this.folderList.push(folder);
  }

  onDbClick(id: string) {
    const folder = this.tableData.filter(val => val.id === id)[0];
    this.addToFolderList(folder);
    this.tableRouter.push({ id: folder.id, folder: folder.fileName });
    this.tableData = folder.fileContains;
  }

  ngOnInit() {
    this.fileService.files.subscribe(item => {
      this.storeData = item['userFile'];
      this.tableData = this.storeData.fileContains;
      this.storeData.fileName = 'root';
      this.tableRouter = [
        { id: this.storeData.id, folder: this.storeData.fileName }
      ]
    })
  }
}
