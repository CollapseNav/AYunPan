/*
 * @Author: CollapseNav
 * @Date: 2020-04-03 00:05:18
 * @LastEditors: CollapseNav
 * @LastEditTime: 2020-04-03 00:49:02
 * @Description:
 */
import { Component, OnInit, Input } from '@angular/core';
import { UserFilesService } from 'app/services/userfiles/userFiles.service';
import { FileUploader, FileItem } from 'ng2-file-upload';
import { UserFile } from 'app/unit/userFiles';

@Component({
  selector: 'app-uploadmodal',
  templateUrl: './uploadmodal.component.html',
  styleUrls: ['./uploadmodal.component.scss']
})
export class UploadmodalComponent implements OnInit {
  uploader: FileUploader;

  @Input() rootFolder: UserFile;

  constructor(private fileService: UserFilesService) { }

  // 文件上传部分
  uploadFile(file: FileItem) {
    file.withCredentials = true;
    file.upload();
  }

  ngOnInit() {
    this.uploader = this.fileService.uploader;
    this.uploader.onSuccessItem = (item, res) => {
      const resfile = JSON.parse(res);
      this.rootFolder.fileContains.push(resfile);
    }

    this.uploader.onBeforeUploadItem = () => {
      let flag = true;
      this.uploader.options.headers.filter(item => {
        if (item.name === 'Authorization') {
          flag = false;
        }
      })
      if (flag) {
        this.fileService.pushToken();
      }
    }
    this.uploader.options.headers = [
      { name: 'Id', value: localStorage.getItem('Id') },
      { name: 'rootId', value: this.rootFolder.id },
    ];
  }

}
