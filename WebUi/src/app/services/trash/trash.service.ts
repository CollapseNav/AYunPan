/*
 * @Author: CollapseNav
 * @Date: 2020-03-22 19:18:44
 * @LastEditors: CollapseNav
 * @LastEditTime: 2020-03-24 16:36:34
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

  deleteFile(data: DeleteFile) {
    return this.http.post(this.baseUrl + TrashApi.DeleteFile, data).pipe();
  }

  deleteFolder(data: DeleteFolder) {
    return this.http.post(this.baseUrl + TrashApi.DeleteFolder, data).pipe();
  }
}
