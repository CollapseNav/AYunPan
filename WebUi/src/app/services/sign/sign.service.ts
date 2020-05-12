/*
 * @Author: CollapseNav
 * @Date: 2019-12-30 20:18:00
 * @LastEditors: CollapseNav
 * @LastEditTime: 2020-05-12 12:18:59
 * @Description:
 */
import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { signApi } from './signApi';
import { catchError, retry, tap, mapTo } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { SignData } from '../../unit/signData';
import { UserdataService } from '../userdata/userdata.service';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SignService {
  baseUrl: string;
  isSignIn: boolean;
  jwt: string;

  constructor(private http: HttpClient, private userDataService: UserdataService) {
    this.baseUrl = environment.Base_URL;
  }

  getJwtToken(): string {
    const date: Date = new Date(localStorage.getItem('expiration'));
    const now = new Date();
    if (date < now) {
      this.removeToken();
      return null;
    }
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
    localStorage.removeItem('expiration');
  }

  signIn(data: SignData): Observable<boolean> {
    return this.http.post(this.baseUrl + signApi.SignIn, data).pipe(
      retry(1),
      tap(tokens => {
        this.isSignIn = true;
        localStorage.setItem('jwt', tokens['token']);
        this.userDataService.userData = tokens['userData'];
        localStorage.setItem('Id', this.userDataService.userData.id);
        localStorage.setItem('expiration', tokens['expiration']);
      }),
      mapTo(true),
      catchError(error => {
        console.log(error.error);
        return of(false);
      })
    );
  }
}
