/*
 * @Author: CollapseNav
 * @Date: 2020-03-07 13:45:37
 * @LastEditors: CollapseNav
 * @LastEditTime: 2020-03-24 23:14:54
 * @Description:
 */
import { Injectable, Inject } from '@angular/core';
import { UserFile } from 'app/unit/userFiles';
import { FileUploader } from 'ng2-file-upload';
import { HttpClient } from '@angular/common/http';
import { UserFileApi } from './userfileApi';
import { NewFolderData } from '../../unit/newFolderData';
import { SignService } from '../sign/sign.service';
@Injectable({
  providedIn: 'root'
})
export class UserFilesService {

  baseUrl: string;
  files: UserFile = null;
  uploader: FileUploader;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseurl: string, private sign: SignService) {
    this.baseUrl = baseurl;
    this.uploader = new FileUploader({
      url: this.baseUrl + UserFileApi.UploadFile,
      method: 'POST',
      isHTML5: true,
      autoUpload: false,
    });
  }

  pushToken() {
    const token = this.sign.getJwtToken();
    this.uploader.options.headers.push({ name: 'Authorization', value: `Bearer ${token}` });
  }

  createNewFolder(data: NewFolderData) {
    return this.http.post<UserFile>(this.baseUrl + UserFileApi.CreateNewFolder, data).pipe();
  }

  updateFiles() {
    this.getUserFiles().subscribe(result => {
      this.files = result;
    })
  }

  getFiles() {
    return this.files;
  }

  getUserFiles() {
    // tslint:disable-next-line:max-line-length
    return this.http.post<UserFile>(this.baseUrl + UserFileApi.GetUserFiles, { id: localStorage.getItem('Id') }).pipe();
  }

  downloadFile(id: string) {
    return this.http.post(this.baseUrl + UserFileApi.DownloadFile, { id: id }, { responseType: 'blob', observe: 'response' })
      .pipe();
  }
}
