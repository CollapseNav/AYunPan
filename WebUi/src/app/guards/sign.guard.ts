/*
 * @Author: CollapseNav
 * @Date: 2020-01-29 15:53:39
 * @LastEditors: CollapseNav
 * @LastEditTime: 2020-03-24 19:40:38
 * @Description:
 */

import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SignService } from 'app/services/sign/sign.service';

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
