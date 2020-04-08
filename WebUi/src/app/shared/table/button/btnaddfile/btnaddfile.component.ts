/*
 * @Author: CollapseNav
 * @Date: 2020-04-08 14:55:21
 * @LastEditors: CollapseNav
 * @LastEditTime: 2020-04-08 15:22:26
 * @Description:
 */
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserFile, FileTypes } from 'app/unit/userFiles';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DeleteFile } from 'app/unit/deleteFile';
import { AddShareFile } from 'app/unit/addShareFile';
import { SharefilesService } from 'app/services/sharefiles/sharefiles.service';

@Component({
  selector: 'app-btnaddfile',
  templateUrl: './btnaddfile.component.html',
})
export class BtnaddfileComponent implements OnInit {

  @Input() item: UserFile;

  @Output() addToMyFile = new EventEmitter<UserFile>();
  // 就打开modal用的
  onBe(modal: NgbModal) {
    this.modalService.open(modal, { centered: true });
  }
  check(value: boolean, modal: NgbActiveModal) {
    if (value) {
      this.share.addToMyFile(new AddShareFile(this.item.id, localStorage.getItem('Id'))).subscribe(result => {
        this.addToMyFile.emit(result);
      });
    }
    modal.close();
  }

  constructor(private modalService: NgbModal,
    private share: SharefilesService) { }

  ngOnInit() {
  }
}
