/*
 * @Author: CollapseNav
 * @Date: 2020-03-06 19:23:30
 * @LastEditors: CollapseNav
 * @LastEditTime: 2020-03-21 21:44:21
 * @Description:
 */
import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserFilesService } from 'app/services/userfiles/userFiles.service';
import { UserFile } from 'app/unit/userFiles';
import { DeleteFile } from 'app/unit/deleteFile';
declare interface DataItem {
  ID: string;
  FileName: string;
  FileType: string;
  FileSize: string;
}

declare interface TheadPercent {
  content: string;
  per: string;
}

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
})
export class TrashComponent implements OnInit {
  tableThead = [
    { content: 'FileName', per: '25%' },
    { content: 'FileType', per: '20%' },
    { content: 'FileSize', per: '20%' },
    { content: 'AddDate', per: '20%' },
    { content: 'Be', per: '15%' },
  ];
  tableData: UserFile[] = [];

  folderList: UserFile[] = [];

  file = { id: '', fileName: '' };
  storeData: UserFile;

  tableRouter = [{ id: '', folder: '' }];

  constructor(private modalService: NgbModal, private fileService: UserFilesService) { }
  turnBackTo(id: string) {
    if (id === this.storeData.id) {
      this.tableData = this.storeData.fileContains;
    } else {
      const folder = this.folderList.filter(item => item.id === id)[0];
      this.tableData = folder.fileContains;
    }
    this.tableRouter = this.tableRouter.slice(0, this.tableRouter.findIndex(item => item.id === id) + 1);
  }

  onBe(modal: NgbModal, item: UserFile) {
    this.file = { id: item.id, fileName: item.fileName };
    this.modalService.open(modal, { centered: true });
  }

  unDelete(modal: NgbActiveModal, id: string) {
    const file = this.tableData.filter(item => item.id === this.file.id)[0];
    this.fileService.deleteFile(new DeleteFile(file.id, 0)).subscribe(result => {
      if (result) {
        file.isDeleted = '0';
      } else {
        console.log(result);
      }
    })
    modal.close();
  }


  addToFolderList(folder: UserFile) {
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
    if (this.fileService.getFiles() == null) {
      this.fileService.getUserFiles().subscribe(item => {
        this.storeData = item;
        this.fileService.files = this.storeData;
        this.tableData = this.storeData.fileContains;
        this.tableRouter = [
          { id: this.storeData.id, folder: 'root' }
        ]
      });
    } else {
      this.storeData = this.fileService.getFiles();
      this.tableData = this.storeData.fileContains;
      this.tableRouter = [
        { id: this.storeData.id, folder: 'root' }
      ]
    }
  }
}
