/*
import { UserFile } from 'app/unit/userFiles';
 * @Author: CollapseNav
 * @Date: 2020-04-04 18:49:14
 * @LastEditors: CollapseNav
 * @LastEditTime: 2020-05-31 18:11:38
 * @Description:
 */
import { Component, OnInit, Input } from '@angular/core';
import { UserFile } from 'app/unit/userFiles';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserFilesService } from 'app/services/userfiles/userFiles.service';
import { saveAs } from 'file-saver';
import { HttpClient } from '@angular/common/http';

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
      this.http.get(result['filePath'], { responseType: 'blob', observe: 'response' }).subscribe(res => {
        const filename = `${this.item.fileName}.${this.item.fileExt}`;
        const file: Blob = new Blob([res.body]);
        saveAs(file, filename);
      })
    })
  }

  constructor(private modalService: NgbModal,
    private http: HttpClient,
    private fileService: UserFilesService) { }

  ngOnInit() {
  }

}
