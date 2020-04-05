/*
 * @Author: CollapseNav
 * @Date: 2020-04-04 18:49:01
 * @LastEditors: CollapseNav
 * @LastEditTime: 2020-04-04 19:57:24
 * @Description:
 */
import { Component, OnInit, Input } from '@angular/core';
import { UserFile, FileTypes } from 'app/unit/userFiles';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ShareFile } from 'app/unit/shareFile';
import { SharefilesService } from 'app/services/sharefiles/sharefiles.service';

@Component({
  selector: 'app-btnushare',
  templateUrl: './btnushare.component.html',
  styleUrls: ['./btnushare.component.scss']
})
export class BtnushareComponent implements OnInit {

  @Input() item: UserFile;
  // 就打开modal用的
  onBe(modal: NgbModal) {
    this.modalService.open(modal, { centered: true });
  }
  check(value: boolean, modal: NgbActiveModal) {
    if (value) {
      if (this.item.fileTypes === FileTypes.folder) {
        this.share.shareFolder(new ShareFile(this.item.id, 0)).subscribe(result => {
          if (result) {
            this.setFolderShare(this.item);
          }
        });
      } else {
        this.share.shareFile(new ShareFile(this.item.id, 0)).subscribe(result => {
          if (result) {
            this.item.isShared = '0';
          }
        })
      }
    }
    modal.close();
  }

  // 将文件夹里的所有文件都设为 share
  private setFolderShare(folder: UserFile) {
    folder.isShared = '0';
    if (folder.fileContains != null) {
      folder.fileContains.forEach(item => {
        item.isShared = '0';
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
