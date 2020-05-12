/*
 * @Author: CollapseNav
 * @Date: 2020-03-11 17:28:28
 * @LastEditors: CollapseNav
 * @LastEditTime: 2020-05-12 12:19:56
 * @Description:
 */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserData } from 'app/unit/userData';
import { UserDataApi } from './userdataapi';
import { retry, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserdataService {

  baseUrl: string;
  userData: UserData;

  constructor(private http: HttpClient) {
    this.baseUrl = environment.Base_URL;
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
