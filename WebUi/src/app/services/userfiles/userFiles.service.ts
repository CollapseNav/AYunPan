/*
 * @Author: CollapseNav
 * @Date: 2020-03-07 13:45:37
 * @LastEditors: CollapseNav
 * @LastEditTime: 2020-03-17 22:11:27
 * @Description:
 */
import { Injectable, Inject } from '@angular/core';
import { UserFile, FileTypes } from 'app/unit/userFiles';
import { MockUserFiles } from 'app/mock/mock_userfiles';
import { FileUploader } from 'ng2-file-upload';
import { HttpClient } from '@angular/common/http';
import { UserFileApi } from './userfileApi';
import { tap } from 'rxjs/operators';
import { Observable, observable, of, from } from 'rxjs';
import { NewFolderData } from '../../unit/newFolderData';

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
    });
    // this.getUserFiles().subscribe(result => {
    //   this.files = result['userFile'];
    // });
  }

  createNewFolder(data: NewFolderData) {
    return this.http.post(this.baseUrl + UserFileApi.CreateNewFolder, data).pipe();
  }

  getFiles() {
    return this.files;
  }

  getUserFiles() {
    return this.http.get<UserFile>(this.baseUrl + UserFileApi.GetUserFiles, { params: { id: localStorage.getItem('Id') } }).pipe(
    );
  }

  shareFile(id: string) {
    return this.http.post(this.baseUrl + UserFileApi.ShareFile, { id: id }).pipe();
  }

  deleteFile(id: string) {
    return this.http.post(this.baseUrl + UserFileApi.DeleteFile, { id: id }).pipe();
  }

  unShareFile(id: string) {
    return this.http.post(this.baseUrl + UserFileApi.UnShareFile, { id: id }).pipe();
  }

  unDeleteFile(id: string) {
    return this.http.post(this.baseUrl + UserFileApi.UnDeleteFile, { id: id }).pipe();
  }

  initUserFiles(files: UserFile[]) {
    const tfiles = files.filter(item => item.isDeleted === '0');
    const userfiles: UserFile[] = [];
    tfiles.forEach(item => {
      if (item.fileType === FileTypes.folder) {
        item.fileContains = this.initUserFiles(item.fileContains);
      }
      userfiles.push(item);
    });
    return userfiles;
  }

  initDeletedFiles(files: UserFile[]) {
    const tfiles = files.filter(item => item.isDeleted === '1');
    const deletedfiles: UserFile[] = [];
    tfiles.forEach(item => {
      if (item.fileType === FileTypes.folder) {
        item.fileContains = this.initDeletedFiles(item.fileContains);
      }
      deletedfiles.push(item);
    });
    return deletedfiles;
  }

  initSharedFiles(files: UserFile[]) {
    const tfiles = files.filter(item => item.isShared === '1' && item.isDeleted === '0');
    const sharedlist: UserFile[] = [];
    tfiles.forEach(item => {
      if (item.fileType === FileTypes.folder) {
        item.fileContains = this.initSharedFiles(item.fileContains);
      }
      sharedlist.push(item);
    });
    return sharedlist;
  }
}
