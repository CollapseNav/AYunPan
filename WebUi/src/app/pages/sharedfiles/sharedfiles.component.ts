/*
 * @Author: CollapseNav
 * @Date: 2020-03-06 19:23:19
 * @LastEditors: CollapseNav
 * @LastEditTime: 2020-03-16 21:32:26
 * @Description:
 */
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserFilesService } from 'app/services/userfiles/userFiles.service';
import { UserFile } from 'app/unit/userFiles';

@Component({
  selector: 'app-sharedfiles',
  templateUrl: './sharedfiles.component.html',
})
export class SharedfilesComponent implements OnInit {
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
    this.fileService.ofiles.subscribe(item => {
      this.storeData = item['userFile'];
      this.tableData = this.storeData.fileContains;
      this.storeData.fileName = 'root';
      this.tableRouter = [
        { id: this.storeData.id, folder: this.storeData.fileName }
      ]
    })
  }
}
