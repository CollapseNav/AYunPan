/*
 * @Author: CollapseNav
 * @Date: 2020-04-04 18:46:43
 * @LastEditors: CollapseNav
 * @LastEditTime: 2020-04-05 18:54:27
 * @Description:
 */
import { Component, OnInit, Input } from '@angular/core';
import { UserFile, FileTypes } from 'app/unit/userFiles';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SharefilesService } from 'app/services/sharefiles/sharefiles.service';
import { ShareFile } from 'app/unit/shareFile';

@Component({
  selector: 'app-btnshare',
  templateUrl: './btnshare.component.html',
})
export class BtnshareComponent implements OnInit {

  @Input() item: UserFile;
  // 就打开modal用的
  onBe(modal: NgbModal) {
    this.modalService.open(modal, { centered: true });
  }
  check(value: boolean, modal: NgbActiveModal) {
    if (value) {
      if (this.item.fileTypes === FileTypes.folder) {
        this.share.shareFolder(new ShareFile(this.item.id, 1)).subscribe(result => {
          if (result) {
            this.setFolderShare(this.item);
          }
        });
      } else {
        this.share.shareFile(new ShareFile(this.item.id, 1)).subscribe(result => {
          if (result) {
            this.item.isShared = '1';
          }
        })
      }
    }
    modal.close();
  }

  // 将文件夹里的所有文件都设为 share
  private setFolderShare(folder: UserFile) {
    folder.isShared = '1';
    if (folder.fileContains != null) {
      folder.fileContains.forEach(item => {
        item.isShared = '1';
        if (item.fileTypes === FileTypes.folder) {
          this.setFolderShare(item);
        }
      })
    }
  }
  constructor(private modalService: NgbModal,
    private share: SharefilesService) { }

  ngOnInit() {
  }

}
