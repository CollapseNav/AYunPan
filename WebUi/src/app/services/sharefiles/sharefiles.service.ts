/*
 * @Author: CollapseNav
 * @Date: 2020-03-22 19:14:26
 * @LastEditors: CollapseNav
 * @LastEditTime: 2020-03-22 21:57:40
 * @Description:
 */
import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ShareFile } from 'app/unit/shareFile';
import { ShareFileApi } from './sharefileApi';
import { ShareFolder } from 'app/unit/shareFolder';
import { UserFile } from 'app/unit/userFiles';

@Injectable({
  providedIn: 'root'
})
export class SharefilesService {
  baseUrl: string;
  files: UserFile = null;
  constructor(private http: HttpClient, @Inject('BASE_URL') baseurl: string) {
    this.baseUrl = baseurl.replace('4200', '5000');
  }

  getShareFiles() {
    return this.http.post<UserFile[]>(this.baseUrl + ShareFileApi.GetShareFiles, { id: 'fd' }).pipe();
  }

  shareFile(data: ShareFile) {
    return this.http.post(this.baseUrl + ShareFileApi.ShareFile, data).pipe();
  }

  shareFolder(data: ShareFolder) {
    return this.http.post(this.baseUrl + ShareFileApi.ShareFolder, data).pipe();
  }

}
