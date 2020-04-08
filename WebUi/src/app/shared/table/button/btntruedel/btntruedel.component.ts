/*
 * @Author: CollapseNav
 * @Date: 2020-04-07 20:32:44
 * @LastEditors: CollapseNav
 * @LastEditTime: 2020-04-08 15:22:58
 * @Description:
 */
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FileTypes, UserFile } from 'app/unit/userFiles';
import { TrashService } from 'app/services/trash/trash.service';

@Component({
  selector: 'app-btntruedel',
  templateUrl: './btntruedel.component.html',
})
export class BtntruedelComponent implements OnInit {
  @Input() item: UserFile;

  @Output() truedel = new EventEmitter<UserFile>();

  onBe(modal: NgbModal) {
    this.modalService.open(modal, { centered: true });
  }
  check(value: boolean, modal: NgbActiveModal) {
    if (value) {

      this.trash.trueDeleteFile({ id: this.item.id }).subscribe(result => {
        if (result) {
          this.truedel.emit(this.item);
        }
      });
    }
    modal.close();
  }

  // 将文件夹里的所有文件都设为 delete
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
  constructor(private modalService: NgbModal,
    private trash: TrashService) { }

  ngOnInit() {
  }

}
