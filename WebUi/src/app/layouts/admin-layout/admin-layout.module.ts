/*
 * @Author: CollapseNav
 * @Date: 2020-03-01 15:57:08
 * @LastEditors: CollapseNav
 * @LastEditTime: 2020-03-02 02:37:14
 * @Description:
 */
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminLayoutRoutes } from './admin-layout.routing';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserComponent } from '../../pages/user/user.component';
import { TypographyComponent } from '../../pages/typography/typography.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { NotificationsComponent } from '../../pages/notifications/notifications.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserfilesComponent } from 'app/pages/userfiles/userfiles.component';
import { InfoboardComponent } from 'app/pages/infoboard/infoboard.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  declarations: [
    UserfilesComponent,
    DashboardComponent,
    UserComponent,
    TypographyComponent,
    IconsComponent,
    NotificationsComponent,
    InfoboardComponent,
  ]
})

export class AdminLayoutModule { }
