/*
 * @Author: CollapseNav
 * @Date: 2020-03-08 22:43:03
 * @LastEditors: CollapseNav
 * @LastEditTime: 2020-03-25 21:49:37
 * @Description:
 */
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SignService } from 'app/services/sign/sign.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.scss']
})
export class SignComponent implements OnInit {

  signForm: FormGroup;

  isFlip = false;

  signIn() {
    this.signService.signIn(this.signForm.value).subscribe(result => {
      if (result) {
        this.router.navigate(['main']);
      }
    })
  }
  flipForm() {
    this.signForm.reset();
    this.isFlip = !this.isFlip;
  }
  signUp() {
    this.signService.signUp(this.signForm.value).subscribe(result => {
      if (result) {
        this.flipForm();
      }
    });
  }
  constructor(private signService: SignService, private formbuild: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.signForm = this.formbuild.group({
      userAccount: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

}
