/*
 * @Author: CollapseNav
 * @Date: 2020-04-04 22:25:39
 * @LastEditors: CollapseNav
 * @LastEditTime: 2020-04-08 14:53:00
 * @Description:
 */
import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FileTypes, UserFile } from 'app/unit/userFiles';
import { TrashService } from 'app/services/trash/trash.service';
import { DeleteFile } from 'app/unit/deleteFile';

@Component({
  selector: 'app-btnudel',
  templateUrl: './btnudel.component.html',
})
export class BtnudelComponent implements OnInit {

  @Input() item: UserFile;
  // 就打开modal用的
  onBe(modal: NgbModal) {
    this.modalService.open(modal, { centered: true });
  }
  check(value: boolean, modal: NgbActiveModal) {
    if (value) {
      if (this.item.fileTypes === FileTypes.folder) {
        this.trash.deleteFolder(new DeleteFile(this.item.id, 0)).subscribe(result => {
          if (result) {
            this.setFolderDelete(this.item);
          }
        });
      } else {
        this.trash.deleteFile(new DeleteFile(this.item.id, 0)).subscribe(result => {
          if (result) {
            this.item.isDeleted = '0';
          }
        })
      }
    }
    modal.close();
  }

  // 将文件夹里的所有文件都设为 delete
  private setFolderDelete(folder: UserFile) {
    folder.isDeleted = '0';
    if (folder.fileContains != null) {
      folder.fileContains.forEach(item => {
        item.isDeleted = '0';
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
