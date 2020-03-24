/*
 * @Author: CollapseNav
 * @Date: 2020-01-08 15:18:49
 * @LastEditors: CollapseNav
 * @LastEditTime: 2020-03-24 19:37:34
 * @Description:
 */
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SignService } from 'app/services/sign/sign.service';

@Injectable({ providedIn: 'root' })
export class MainGuard implements CanActivate {
  constructor(private router: Router, private signservice: SignService) { }

  canActivate(): boolean {
    if (this.signservice.checkSignIn()) {
      return true;
    }
    this.router.navigate(['index']);
    return false;
  }
}
