/*
 * @Author: CollapseNav
 * @Date: 2020-03-06 19:23:19
 * @LastEditors: CollapseNav
 * @LastEditTime: 2020-03-22 17:52:23
 * @Description:
 */
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserFilesService } from 'app/services/userfiles/userFiles.service';
import { UserFile, FileTypes } from 'app/unit/userFiles';
import { saveAs } from 'file-saver';
import { ShareFile } from 'app/unit/shareFile';
import { DeleteFile } from 'app/unit/deleteFile';
import { DeleteFolder } from 'app/unit/deleteFolder';
import { ShareFolder } from 'app/unit/shareFolder';

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
  currentJustify = 'fill';
  tableData: UserFile[] = [];

  folderList: UserFile[] = [];
  storeData: UserFile;

  tableRouter = [{ id: '', folder: '' }];

  file = { id: '', fileName: '' };

  constructor(private modalService: NgbModal, private fileService: UserFilesService) { }

  downloadFile(id: string) {
    this.fileService.downloadFile(id).subscribe(result => {
      const filename = result.headers.get('filename');
      const file: Blob = new Blob([result.body]);
      saveAs(file, filename);
    })
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

  //#region table 方法

  onBe(modal: NgbModal, item: UserFile) {
    this.file = { id: item.id, fileName: item.fileName };
    this.modalService.open(modal, { centered: true });
  }

  deleteFile(modal: NgbActiveModal, id: string) {
    const file = this.tableData.filter(item => item.id === id)[0];
    if (file.fileTypes === FileTypes.folder) {
      let path = '/' + this.storeData.fileName;
      this.tableRouter.forEach(item => {
        if (item.folder !== 'root') {
          path += '/' + item.folder;
        }
      })
      path += '/' + file.fileName;
      this.fileService.deleteFolder(new DeleteFolder(file.id, path, 1)).subscribe(result => {
        if (result) {
          this.setFolderDelete(file);
        }
      })
    } else {
      this.fileService.deleteFile(new DeleteFile(file.id, 1)).subscribe(result => {
        if (result) {
          file.isDeleted = '1';
        } else {
          console.log(result);
        }
      })
    }
    modal.close();
  }

  // ????
  unShare(modal: NgbActiveModal, id: string) {
    const file = this.tableData.filter(item => item.id === id)[0];
    if (file.fileTypes === FileTypes.folder) {
      let path = '/' + this.storeData.fileName;
      this.tableRouter.forEach(item => {
        if (item.folder !== 'root') {
          path += '/' + item.folder;
        }
      })
      path += '/' + file.fileName;
      this.fileService.shareFolder(new ShareFolder(file.id, path, 0)).subscribe(result => {
        if (result) {
          this.setFolderUnShare(file);
        }
      })
    } else {
      this.fileService.shareFile(new ShareFile(file.id, 0)).subscribe(result => {
        if (result) {
          file.isShared = '1';
        } else {
          console.log(result);
        }
      })
    }
    modal.close();
  }

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

  private setFolderUnShare(folder: UserFile) {
    folder.isShared = '0';
    if (folder.fileContains != null) {
      folder.fileContains.forEach(item => {
        item.isShared = '0';
        if (item.fileTypes === FileTypes.folder) {
          this.setFolderUnShare(item);
        }
      })
    }
  }

  //#endregion

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
