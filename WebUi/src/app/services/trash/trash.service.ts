/*
 * @Author: CollapseNav
 * @Date: 2020-03-22 19:18:44
 * @LastEditors: CollapseNav
 * @LastEditTime: 2020-03-24 18:56:25
 * @Description:
 */
import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DeleteFile } from 'app/unit/deleteFile';
import { TrashApi } from './trashApi';
import { DeleteFolder } from 'app/unit/deleteFolder';

@Injectable({
  providedIn: 'root'
})
export class TrashService {
  baseUrl: string;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseurl: string) {
    this.baseUrl = baseurl;
  }

  trueDeleteFile(data) {
    return this.http.post(this.baseUrl + TrashApi.TrueDeleteFile, data).pipe();
  }

  deleteFile(data: DeleteFile) {
    return this.http.post(this.baseUrl + TrashApi.DeleteFile, data).pipe();
  }

  deleteFolder(data: DeleteFolder) {
    return this.http.post(this.baseUrl + TrashApi.DeleteFolder, data).pipe();
  }
}
