/*
 * @Author: CollapseNav
 * @Date: 2020-01-29 15:53:39
 * @LastEditors: CollapseNav
 * @LastEditTime: 2020-05-12 12:29:45
 * @Description:
 */

import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SignService } from 'app/services/sign/sign.service';
/**
 * 如果已经获取到了 token 就不再重复登陆了
 */
@Injectable({ providedIn: 'root' })
export class SignGuard implements CanActivate {
  constructor(private router: Router, private signservice: SignService) { }

  canActivate(): boolean {
    if (this.signservice.checkSignIn()) {
      this.router.navigate(['main/infoboard']);
      return false;
    }
    return true;
  }
}
