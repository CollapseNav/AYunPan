/*
 * @Author: CollapseNav
 * @Date: 2020-04-03 21:48:02
 * @LastEditors: CollapseNav
 * @LastEditTime: 2020-04-05 18:54:17
 * @Description:
 */
import { Component, OnInit, Input } from '@angular/core';
import { UserFile, FileTypes } from 'app/unit/userFiles';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TrashService } from 'app/services/trash/trash.service';
import { DeleteFile } from 'app/unit/deleteFile';

@Component({
  selector: 'app-btndel',
  templateUrl: './btndel.component.html',
})
export class BtndelComponent implements OnInit {

  @Input() item: UserFile;
  // 就打开modal用的
  onBe(modal: NgbModal) {
    this.modalService.open(modal, { centered: true });
  }
  check(value: boolean, modal: NgbActiveModal) {
    if (value) {
      if (this.item.fileTypes === FileTypes.folder) {
        this.trash.deleteFolder(new DeleteFile(this.item.id, 1)).subscribe(result => {
          if (result) {
            this.setFolderDelete(this.item);
          }
        });
      } else {
        this.trash.deleteFile(new DeleteFile(this.item.id, 1)).subscribe(result => {
          if (result) {
            this.item.isDeleted = '1';
          }
        })
      }
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
