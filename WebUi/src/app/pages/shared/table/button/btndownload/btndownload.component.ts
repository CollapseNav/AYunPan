/*
import { UserFile } from 'app/unit/userFiles';
 * @Author: CollapseNav
 * @Date: 2020-04-04 18:49:14
 * @LastEditors: CollapseNav
 * @LastEditTime: 2020-04-04 20:07:10
 * @Description:
 */
import { Component, OnInit, Input } from '@angular/core';
import { UserFile } from 'app/unit/userFiles';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserFilesService } from 'app/services/userfiles/userFiles.service';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-btndownload',
  templateUrl: './btndownload.component.html',
})
export class BtndownloadComponent implements OnInit {
  @Input() item: UserFile;
  // 就打开modal用的
  onBe(modal: NgbModal) {
    this.modalService.open(modal, { centered: true });
  }
  check(value: boolean, modal: NgbActiveModal) {
    if (value) {
      this.downloadFile();
    }
    modal.close();
  }

  downloadFile() {
    this.fileService.downloadFile(this.item.id).subscribe(result => {
      // 我把文件名放到 header 中了
      const filename = result.headers.get('filename');
      const file: Blob = new Blob([result.body]);
      // 这 filesaver 还挺好用的
      saveAs(file, filename);
    })
  }

  constructor(private modalService: NgbModal,
    private fileService: UserFilesService) { }

  ngOnInit() {
  }

}
