/*
 * @Author: CollapseNav
 * @Date: 2020-03-06 19:23:19
 * @LastEditors: CollapseNav
 * @LastEditTime: 2020-03-24 15:18:51
 * @Description:
 */
import { Component, OnInit, IterableDiffers } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserFilesService } from 'app/services/userfiles/userFiles.service';
import { UserFile, FileTypes } from 'app/unit/userFiles';
import { saveAs } from 'file-saver';
import { ShareFile } from 'app/unit/shareFile';
import { DeleteFile } from 'app/unit/deleteFile';
import { DeleteFolder } from 'app/unit/deleteFolder';
import { ShareFolder } from 'app/unit/shareFolder';
import { SharefilesService } from 'app/services/sharefiles/sharefiles.service';
import { TrashService } from 'app/services/trash/trash.service';

export class TableConfig {
  constructor(
    public total: number,
    public size: number,
    public dataBatch: number,
    public index: number,
    public maxIndex: number,
    public asc: boolean,
    public maxSize: number) { }
}
@Component({
  selector: 'app-sharedfiles',
  templateUrl: './sharedfiles.component.html',
})
export class SharedfilesComponent implements OnInit {
  tableThead = [
    { content: 'FileName', per: '35%' },
    { content: 'FileType', per: '20%' },
    { content: 'FileSize', per: '10%' },
    { content: 'AddDate', per: '20%' },
    { content: 'Be', per: '15%' },
  ];
  config = new TableConfig(0, 10, 1, 1, 1, true, 5);
  // currentJustify = 'fill';
  tableData: UserFile[] = [];

  folderList: UserFile[] = [];
  storeData: UserFile;

  shareFilesData: UserFile[] = [];

  tableRouter = [{ id: '', folder: '' }];

  shareTableData: UserFile[] = [];

  file = { id: '', fileName: '' };

  constructor(private modalService: NgbModal,
    private fileService: UserFilesService,
    private share: SharefilesService,
    private trash: TrashService) { }

  indexChange() {
    let maxIndex = this.config.total / this.config.size;
    if (this.config.total % this.config.size > 0) {
      maxIndex++;
    }
    if (this.config.maxIndex < maxIndex && (this.config.maxIndex - this.config.index) < 2) {
      this.getShareData();
    }
    const startindex = (this.config.index - 1) * this.config.size;
    this.shareTableData = this.shareFilesData.slice(startindex, startindex + this.config.size);
  }

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

  //#region table

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
      this.share.shareFolder(new ShareFolder(file.id, path, 0)).subscribe(result => {
        if (result) {
          this.setFolderUnShare(file);
        }
      })
    } else {
      this.share.shareFile(new ShareFile(file.id, 0)).subscribe(result => {
        if (result) {
          file.isShared = '0';
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

  initSharedFiles(files: UserFile) {
    const sharedlist: UserFile[] = [];
    files.fileContains.filter(item => item.isShared === '1' && item.isDeleted === '0').forEach(item => {
      if (item.fileTypes === FileTypes.folder) {
        item.fileContains = this.initSharedFiles(item);
      }
      sharedlist.push(item);
    });
    files.fileContains.filter(item => item.isShared === '0' && item.isDeleted === '0' && item.fileTypes === FileTypes.folder)
      .forEach(item => {
        if (item.fileContains !== null) {
          this.initSharedFiles(item).forEach(f => {
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
    this.getShareData();
  }

  initTableData() {
    this.tableData = this.initSharedFiles(this.storeData);
    this.tableRouter = [
      { id: this.storeData.id, folder: 'root' }
    ];
    this.folderList.push(this.storeData);
  }
  getShareData() {
    this.share.getShareFiles(this.config).subscribe(result => {
      this.config.total = result['max'];
      const ls: UserFile[] = result['files'];
      ls.forEach(item => {
        this.shareFilesData.push(item);
      })
      this.config.maxIndex = this.shareFilesData.length / this.config.size;
      if (this.shareFilesData.length % this.config.size > 0) {
        this.config.maxIndex += 1;
      }
      this.config.dataBatch += 1;
      const startindex = (this.config.index - 1) * this.config.size;
      this.shareTableData = this.shareFilesData.slice(startindex, startindex + this.config.size);
    })
  }
}
