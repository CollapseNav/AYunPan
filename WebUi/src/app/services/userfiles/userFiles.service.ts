/*
 * @Author: CollapseNav
 * @Date: 2020-03-07 13:45:37
 * @LastEditors: CollapseNav
 * @LastEditTime: 2020-03-21 21:55:44
 * @Description:
 */
import { Injectable, Inject } from '@angular/core';
import { UserFile, FileTypes } from 'app/unit/userFiles';
import { MockUserFiles } from 'app/mock/mock_userfiles';
import { FileUploader } from 'ng2-file-upload';
import { HttpClient, HttpResponseBase } from '@angular/common/http';
import { UserFileApi } from './userfileApi';
import { tap, map } from 'rxjs/operators';
import { Observable, observable, of, from } from 'rxjs';
import { NewFolderData } from '../../unit/newFolderData';
import { ShareFolder } from 'app/unit/shareFolder';
import { ShareFile } from 'app/unit/shareFile';
import { DeleteFile } from 'app/unit/deleteFile';
import { DeleteFolder } from 'app/unit/deleteFolder';
@Injectable({
  providedIn: 'root'
})
export class UserFilesService {

  baseUrl: string;
  files: UserFile = null;
  // ofiles: Observable<UserFile>;
  uploader: FileUploader;

  constructor(private mock: MockUserFiles, private http: HttpClient, @Inject('BASE_URL') baseurl: string) {
    this.baseUrl = baseurl.replace('4200', '5000');
    // this.files = mock.getMockData(mock.MockDepth());
    this.uploader = new FileUploader({
      url: this.baseUrl + UserFileApi.UploadFile,
      method: 'POST',
      isHTML5: true,
      autoUpload: false,
      headers: [
        { name: 'Id', value: localStorage.getItem('Id') },
      ],
    });
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

  shareFile(data: ShareFile) {
    return this.http.post(this.baseUrl + UserFileApi.ShareFile, data).pipe();
  }

  shareFolder(data: ShareFolder) {
    return this.http.post(this.baseUrl + UserFileApi.ShareFolder, data).pipe();
  }

  deleteFile(data: DeleteFile) {
    return this.http.post(this.baseUrl + UserFileApi.DeleteFile, data).pipe();
  }

  deleteFolder(data: DeleteFolder) {
    return this.http.post(this.baseUrl + UserFileApi.DeleteFolder, data).pipe();
  }

}
