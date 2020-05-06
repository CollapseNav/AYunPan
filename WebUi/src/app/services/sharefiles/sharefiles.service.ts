/*
 * @Author: CollapseNav
 * @Date: 2020-03-22 19:14:26
 * @LastEditors: CollapseNav
 * @LastEditTime: 2020-05-06 12:02:19
 * @Description:
 */
import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ShareFile } from 'app/unit/shareFile';
import { ShareFileApi } from './sharefileApi';
import { UserFile } from 'app/unit/userFiles';
import { AddShareFile } from 'app/unit/addShareFile';
import { PageConfig } from 'app/shared/filecom/fileconfig';

@Injectable({
  providedIn: 'root'
})
export class SharefilesService {
  baseUrl: string;
  constructor(private http: HttpClient, @Inject('BASE_URL') baseurl: string) {
    this.baseUrl = baseurl;
  }

  getShareFiles(config: PageConfig) {
    // tslint:disable-next-line:max-line-length
    return this.http.post<UserFile[]>(this.baseUrl + ShareFileApi.GetShareFiles, { isAsc: config.asc, isShare: 1, index: config.batch, size: config.size * config.maxSize }).pipe();
  }

  shareFile(data: ShareFile) {
    return this.http.post(this.baseUrl + ShareFileApi.ShareFile, data).pipe();
  }

  shareFolder(data: ShareFile) {
    return this.http.post(this.baseUrl + ShareFileApi.ShareFolder, data).pipe();
  }

  addToMyFile(data: AddShareFile) {
    return this.http.post<UserFile>(this.baseUrl + ShareFileApi.AddToMyFile, data).pipe();
  }

}
