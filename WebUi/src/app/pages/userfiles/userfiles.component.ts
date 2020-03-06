/*
 * @Author: CollapseNav
 * @Date: 2020-03-01 16:40:22
 * @LastEditors: CollapseNav
 * @LastEditTime: 2020-03-02 02:22:28
 * @Description:
 */
import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
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
  selector: 'app-userfiles',
  moduleId: module.id,
  templateUrl: './userfiles.component.html',
})
export class UserfilesComponent implements OnInit {
  public tableThead: TheadPercent[];
  public tableData: DataItem[];

  constructor(private modalService: NgbModal) { }

  onDelete(modal) {
    this.modalService.open(modal, { centered: true });
  }

  onDelCheck(modal: NgbActiveModal) {
    modal.close();
  }

  ngOnInit() {
    this.tableThead = [
      { content: 'ID', per: '10%' },
      { content: 'FileName', per: '30%' },
      { content: 'FileType', per: '20%' },
      { content: 'FileSize', per: '20%' },
      { content: 'Be', per: '20%' },
    ];
    this.tableData = [
      { ID: '1', FileName: 'Dakota Rice', FileType: '$36,738', FileSize: 'Niger' },
      { ID: '2', FileName: 'Minerva Hooper', FileType: '$36,738', FileSize: 'Malawi' },
      { ID: '3', FileName: 'Sage Rodriguez', FileType: '$36,738', FileSize: 'Netherlands' },
      { ID: '1', FileName: 'Dakota Rice', FileType: '$36,738', FileSize: 'Niger' },
      { ID: '1', FileName: 'Dakota Rice', FileType: '$36,738', FileSize: 'Niger' },
      { ID: '1', FileName: 'Dakota Rice', FileType: '$36,738', FileSize: 'Niger' },
    ];
  }

}
