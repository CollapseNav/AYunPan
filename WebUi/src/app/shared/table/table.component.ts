/*
 * @Author: CollapseNav
 * @Date: 2020-04-04 22:25:31
 * @LastEditors: CollapseNav
 * @LastEditTime: 2020-04-07 20:52:15
 * @Description:
 */
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserFile } from 'app/unit/userFiles';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserFilesService } from 'app/services/userfiles/userFiles.service';
import { TheadItem, PageConfig } from '../filecom/fileconfig';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
})
export class TableComponent implements OnInit {
  @Input() tableThead: TheadItem[];
  @Input() tableData: UserFile[];
  @Input() btnGroup: string[];
  @Input() usePage: boolean;
  @Input() pageConfig: PageConfig;
  @Input() tableType: string;

  @Output() doubleClick = new EventEmitter<UserFile>();
  @Output() getPageData = new EventEmitter();
  @Output() getBatchData = new EventEmitter();

  checkThead(value: string) {
    return this.tableThead.findIndex(item => item.content === value) >= 0;
  }

  // 就打开modal用的
  onBe(modal: NgbModal, item: UserFile) {
    this.modalService.open(modal, { centered: true });
  }

  check(value: boolean, modal: NgbActiveModal) {
    modal.close();
  }

  trueDelete(file: UserFile) {
    const index = this.tableData.findIndex(item => item.id === file.id);
    this.tableData.splice(index, 1);
  }

  checkItem(file: UserFile) {
    let result = false;
    switch (this.tableType) {
      case 'userfile': {
        result = file.isDeleted === '0';
        break;
      }
      case 'sharefile': {
        result = (file.isDeleted === '0' && file.isShared === '1');
        break;
      }
      case 'trashfile': {
        result = file.isDeleted === '1';
        break;
      }
    }
    return result;
  }

  dbClick(item: UserFile) {
    this.doubleClick.emit(item);
  }

  indexChange() {
    let maxIndex = this.pageConfig.total / this.pageConfig.size;
    if (this.pageConfig.total % this.pageConfig.size > 0) {
      maxIndex++;
    }
    if (this.pageConfig.maxIndex < maxIndex && (this.pageConfig.maxIndex - this.pageConfig.index) < 2) {
      this.getBatchData.emit();
    }
    this.getPageData.emit();
  }

  constructor(
    private modalService: NgbModal,
    private fileService: UserFilesService, ) { }

  ngOnInit() {
  }
}
