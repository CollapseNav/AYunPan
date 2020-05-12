/*
 * @Author: CollapseNav
 * @Date: 2020-03-22 19:18:44
 * @LastEditors: CollapseNav
 * @LastEditTime: 2020-05-12 12:19:19
 * @Description:
 */
import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DeleteFile } from 'app/unit/deleteFile';
import { TrashApi } from './trashApi';
import { DeleteFolder } from 'app/unit/deleteFolder';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TrashService {
  baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = environment.Base_URL;
  }

  trueDeleteFile(data) {
    return this.http.post(this.baseUrl + TrashApi.TrueDeleteFile, data).pipe();
  }

  deleteFile(data: DeleteFile) {
    return this.http.post(this.baseUrl + TrashApi.DeleteFile, data).pipe();
  }

  deleteFolder(data: DeleteFile) {
    return this.http.post(this.baseUrl + TrashApi.DeleteFolder, data).pipe();
  }
}
