/*
 * @Author: CollapseNav
 * @Date: 2020-04-04 22:25:31
 * @LastEditors: CollapseNav
 * @LastEditTime: 2020-04-04 22:26:36
 * @Description:
 */
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserFile } from 'app/unit/userFiles';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserFilesService } from 'app/services/userfiles/userFiles.service';

export interface TheadItem {
  content: string;
  per: string;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Input() tableThead: TheadItem[];
  @Input() tableData: UserFile[];
  @Input() btnGroup: string[];

  @Output() doubleClick = new EventEmitter<UserFile>();

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

  dbClick(item: UserFile) {
    this.doubleClick.emit(item);
  }

  constructor(
    private modalService: NgbModal,
    private fileService: UserFilesService, ) { }

  ngOnInit() {
  }
}
