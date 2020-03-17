/*
 * @Author: CollapseNav
 * @Date: 2020-03-01 22:44:01
 * @LastEditors: CollapseNav
 * @LastEditTime: 2020-03-17 21:38:09
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
  // public pieChartOptions: ChartOptions = {
  //   responsive: true,
  //   legend: {
  //     display: true,
  //     position: 'left',
  //     labels: {
  //       fontSize: 14,
  //       boxWidth: 14
  //     }
  //   }
  // };
  // public pieChartLabels: Label[] = [
  //   ['Download'],
  //   ['Store'],
  //   ['Mail Sales'],
  // ];
  // public pieChartData: SingleDataSet = [300, 500, 900];
  // public pieChartType: ChartType = 'pie';
  // public pieChartLegend = true;
  // public pieChartPlugins = [];

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
      // console.log(result);
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
