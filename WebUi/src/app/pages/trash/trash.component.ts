/*
 * @Author: CollapseNav
 * @Date: 2020-03-06 19:23:30
 * @LastEditors: CollapseNav
 * @LastEditTime: 2020-03-24 17:53:48
 * @Description:
 */
import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserFilesService } from 'app/services/userfiles/userFiles.service';
import { UserFile, FileTypes } from 'app/unit/userFiles';
import { DeleteFile } from 'app/unit/deleteFile';
import { TrashService } from 'app/services/trash/trash.service';
import { DeleteFolder } from 'app/unit/deleteFolder';
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

  constructor(private modalService: NgbModal, private fileService: UserFilesService, private trash: TrashService) { }

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
    const file = this.tableData.filter(item => item.id === id)[0];
    if (file.fileTypes === FileTypes.folder) {
      let path = '/' + this.storeData.fileName;
      this.tableRouter.forEach(item => {
        if (item.folder !== 'root') {
          path += '/' + item.folder;
        }
      })
      path += '/' + file.fileName;
      this.trash.deleteFolder(new DeleteFolder(file.id, path, 0)).subscribe(result => {
        if (result) {
          this.setFolderUnDelete(file);
        }
      })
    } else {
      this.trash.deleteFile(new DeleteFile(file.id, 0)).subscribe(result => {
        if (result) {
          file.isDeleted = '0';
        } else {
          console.log(result);
        }
      })
    }
    modal.close();
  }

  private setFolderUnDelete(folder: UserFile) {
    folder.isDeleted = '0';
    if (folder.fileContains != null) {
      folder.fileContains.forEach(item => {
        item.isDeleted = '0';
        if (item.fileTypes === FileTypes.folder) {
          this.setFolderUnDelete(item);
        }
      })
    }
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

  initDeletedFiles(files: UserFile) {
    const sharedlist: UserFile[] = [];
    if (files.fileContains == null) {
      return null;
    }
    files.fileContains.filter(item => item.isDeleted === '1').forEach(item => {
      if (item.fileTypes === FileTypes.folder) {
        item.fileContains = this.initDeletedFiles(item);
      }
      sharedlist.push(item);
    });
    files.fileContains.filter(item => item.isDeleted === '0' && item.fileTypes === FileTypes.folder)
      .forEach(item => {
        if (item.fileContains !== null) {
          this.initDeletedFiles(item).forEach(f => {
            sharedlist.push(f);
          })
        }
      })
    return sharedlist;
  }

  ngOnInit() {
    if (this.fileService.getFiles() == null) {
      this.fileService.getUserFiles().subscribe(item => {
        this.storeData = item;
        this.fileService.files = this.storeData;
        this.initTableData();
      });
    } else {
      this.storeData = this.fileService.getFiles();
      this.initTableData();
    }
  }

  initTableData() {
    this.tableData = this.initDeletedFiles(this.storeData);
    this.tableRouter = [
      { id: this.storeData.id, folder: 'root' }
    ];
    this.folderList.push(this.storeData);
  }
}
