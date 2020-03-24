/*
 * @Author: CollapseNav
 * @Date: 2019-12-30 20:18:00
 * @LastEditors: CollapseNav
 * @LastEditTime: 2020-03-24 16:20:55
 * @Description:
 */
import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { signApi } from './signApi';
import { catchError, retry, tap, mapTo } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { SignData } from '../../unit/signData';
import { UserdataService } from '../userdata/userdata.service';

@Injectable({
  providedIn: 'root'
})
export class SignService {
  baseUrl: string;
  isSignIn: boolean;
  jwt: string;

  constructor(private http: HttpClient, private userDataService: UserdataService, @Inject('BASE_URL') baseurl: string) {
    this.baseUrl = baseurl;
  }

  getJwtToken(): string {
    return localStorage.getItem('jwt');
  }

  signUp(data: any) {
    return this.http.post(this.baseUrl + signApi.SignUp, data).pipe(
      retry(1),
    );
  }

  checkSignIn() {
    return !!this.getJwtToken();
  }

  removeToken() {
    localStorage.removeItem('jwt');
    localStorage.removeItem('Id');
  }

  signIn(data: SignData): Observable<boolean> {
    return this.http.post(this.baseUrl + signApi.SignIn, data).pipe(
      retry(1),
      tap(tokens => {
        this.isSignIn = true;
        localStorage.setItem('jwt', tokens['token']);
        this.userDataService.userData = tokens['userData'];
        localStorage.setItem('Id', this.userDataService.userData.id);
      }),
      mapTo(true),
      catchError(error => {
        console.log(error.error);
        return of(false);
      })
    );
  }
}
