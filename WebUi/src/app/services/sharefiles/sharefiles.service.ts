/*
 * @Author: CollapseNav
 * @Date: 2020-03-22 19:14:26
 * @LastEditors: CollapseNav
 * @LastEditTime: 2020-05-12 12:17:47
 * @Description:
 */
import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ShareFile } from 'app/unit/shareFile';
import { ShareFileApi } from './sharefileApi';
import { UserFile } from 'app/unit/userFiles';
import { AddShareFile } from 'app/unit/addShareFile';
import { PageConfig } from 'app/shared/filecom/fileconfig';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SharefilesService {
  baseUrl: string;
  constructor(private http: HttpClient) {
    this.baseUrl = environment.Base_URL;
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
