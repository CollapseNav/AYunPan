/*
 * @Author: CollapseNav
 * @Date: 2020-01-08 16:50:42
 * @LastEditors: CollapseNav
 * @LastEditTime: 2020-05-12 12:27:42
 * @Description:
 */
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { SignService } from 'app/services/sign/sign.service';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class TokenInterceptor implements HttpInterceptor {

  constructor(public signService: SignService, private router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.signService.getJwtToken()) {
      request = this.addToken(request, this.signService.getJwtToken());
    }

    return next.handle(request).pipe(
      catchError((error) => {
        // 当发生401错误的时候重新登陆获取新的token
        if (error.status == 401) {
          this.signService.removeToken();
          this.router.navigate(['index']);
        }
        return of(error);
      })
    );
  }

  /**
   * 把 token 添加到header里
   */
  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        'Authorization': `Bearer ${token}`
      }
    });
  }
}
