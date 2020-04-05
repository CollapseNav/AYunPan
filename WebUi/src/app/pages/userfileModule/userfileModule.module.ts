/*
 * @Author: CollapseNav
 * @Date: 2020-04-02 22:30:37
 * @LastEditors: CollapseNav
 * @LastEditTime: 2020-04-05 12:58:43
 * @Description:
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FileUploadModule } from 'ng2-file-upload';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    FileUploadModule,
  ],
  declarations: [
  ],
})
export class UserfileModuleModule {
}
