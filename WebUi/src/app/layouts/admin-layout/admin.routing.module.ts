/*
 * @Author: CollapseNav
 * @Date: 2020-03-08 23:33:08
 * @LastEditors: CollapseNav
 * @LastEditTime: 2020-04-05 19:24:45
 * @Description:
 */

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AdminLayoutComponent } from './admin-layout.component';
import { InfoboardComponent } from 'app/pages/infoboard/infoboard.component';
import { MainGuard } from 'app/guards/main.guard';
import { UserfileModuleComponent } from 'app/pages/userfileModule/userfileModule.component';
import { SharefileModuleComponent } from 'app/pages/sharefileModule/sharefileModule.component';
import { TrashModuleComponent } from 'app/pages/trashModule/trashModule.component';

@NgModule({
  imports: [
    RouterModule.forChild([{
      path: 'main', component: AdminLayoutComponent,
      canActivate: [MainGuard],
      children: [
        { path: 'infoboard', component: InfoboardComponent },
        { path: 'userfiles', component: UserfileModuleComponent },
        { path: 'sharedfiles', component: SharefileModuleComponent },
        { path: 'trash', component: TrashModuleComponent },
        { path: '', redirectTo: 'infoboard', pathMatch: 'full' },
      ]
    }]
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AdminRoutingModule { }
