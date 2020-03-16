/*
 * @Author: CollapseNav
 * @Date: 2020-03-08 22:43:03
 * @LastEditors: CollapseNav
 * @LastEditTime: 2020-03-15 21:31:10
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

  flipStyle = 'middle logreg-body ';
  middleFlip = 'middle-flip';

  signIn() {
    this.signService.signIn(this.signForm.value).subscribe(result => {
      if (result) {
        this.router.navigate(['main']);
      }
    })
  }
  flipForm() {
    this.signForm.reset();
    if (this.flipStyle.indexOf(this.middleFlip) < 0) {
      this.flipStyle += this.middleFlip;
    } else {
      this.flipStyle = this.flipStyle.replace(this.middleFlip, '');
    }
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
