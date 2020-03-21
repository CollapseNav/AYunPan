/*
 * @Author: CollapseNav
 * @Date: 2020-03-11 17:28:28
 * @LastEditors: CollapseNav
 * @LastEditTime: 2020-03-21 19:31:36
 * @Description:
 */
import { Injectable, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserData } from 'app/unit/userData';
import { UserDataApi } from './userdataapi';
import { retry, mapTo, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserdataService {

  baseUrl: string;
  userData: UserData;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseurl: string) {
    this.baseUrl = baseurl.replace('4200', '5000');
  }

  getUserData(id: string) {
    return this.http.post<UserData>(this.baseUrl + UserDataApi.GetUserData, { id: id }).pipe(
      retry(1),
    );
  }
  editUserData(data: UserData) {
    return this.http.post(this.baseUrl + UserDataApi.EditUserData, data).pipe(
      retry(1),
      catchError(error => {
        console.log(error.error);
        return of(false);
      })
    )
  }
}
