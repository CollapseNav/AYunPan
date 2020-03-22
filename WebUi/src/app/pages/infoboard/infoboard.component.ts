/*
 * @Author: CollapseNav
 * @Date: 2020-03-01 22:44:01
 * @LastEditors: CollapseNav
 * @LastEditTime: 2020-03-22 17:51:14
 * @Description:
 */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MockUserData } from 'app/mock/mock_userdata';
import { UserData } from 'app/unit/userData';
import { ChartOptions, ChartType } from 'chart.js'
import { Label, SingleDataSet } from 'ng2-charts/lib/base-chart.directive';
import { UserdataService } from 'app/services/userdata/userdata.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserFilesService } from 'app/services/userfiles/userFiles.service';

@Component({
  selector: 'app-infoboard',
  templateUrl: './infoboard.component.html',
})
export class InfoboardComponent implements OnInit {

  editForm: FormGroup;
  userData: UserData;
  infoModal: NgbModal;
  modalInfo: string;
  fileNum: number;
  constructor(private builder: FormBuilder,
    private userDataService: UserdataService,
    private userFileService: UserFilesService,
    private modalService: NgbModal) { }
  initModal(modal: NgbModal) {
    this.infoModal = modal;
  }
  onSubmit() {
    this.userDataService.editUserData(this.editForm.value).subscribe(result => {
      if (result) {
        this.modalInfo = '成功';
      } else {
        this.modalInfo = '失败';
      }
      this.modalService.open(this.infoModal, { centered: true });
    });
  }
  ngOnInit() {
    this.userDataService.getUserData(localStorage.getItem('Id')).subscribe(user => {
      this.userData = user['userData'];
      this.editForm = this.builder.group({
        id: [this.userData.id],
        userName: [this.userData.userName],
        email: [this.userData.email, [Validators.required, Validators.email]],
        phone: [this.userData.phone, [Validators.maxLength(11), Validators.minLength(11)]],
        // tslint:disable-next-line:radix
        gender: [Number.parseInt(this.userData.gender)],
        age: [this.userData.age],
        joinDate: [{ value: this.userData.createDate, disabled: true }],
        remark: [this.userData.remark],
      });
    });
  }
}
