/*
 * @Author: CollapseNav
 * @Date: 2020-01-08 16:50:42
 * @LastEditors: CollapseNav
 * @LastEditTime: 2020-04-14 17:42:58
 * @Description:
 */
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SignService } from 'app/services/sign/sign.service';

@Injectable({ providedIn: 'root' })
export class TokenInterceptor implements HttpInterceptor {

  constructor(public signService: SignService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.signService.getJwtToken()) {
      request = this.addToken(request, this.signService.getJwtToken());
    }

    return next.handle(request).pipe(
    );
  }

  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        'Authorization': `Bearer ${token}`
      }
    });
  }
}
