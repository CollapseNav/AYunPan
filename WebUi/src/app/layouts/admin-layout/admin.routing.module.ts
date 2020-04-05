/*
 * @Author: CollapseNav
 * @Date: 2020-03-08 23:33:08
 * @LastEditors: CollapseNav
 * @LastEditTime: 2020-04-05 12:57:53
 * @Description:
 */

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AdminLayoutComponent } from './admin-layout.component';
import { SharedfilesComponent } from 'app/pages/sharedfiles/sharedfiles.component';
import { TrashComponent } from 'app/pages/trash/trash.component';
import { InfoboardComponent } from 'app/pages/infoboard/infoboard.component';
import { MainGuard } from 'app/guards/main.guard';
import { UserfileModuleComponent } from 'app/pages/userfileModule/userfileModule.component';
import { UserfilesComponent } from 'app/pages/userfiles/userfiles.component';

@NgModule({
  imports: [
    RouterModule.forChild([{
      path: 'main', component: AdminLayoutComponent,
      canActivate: [MainGuard],
      children: [
        { path: 'infoboard', component: InfoboardComponent },
        { path: 'userfiles', component: UserfileModuleComponent },
        { path: 'sharedfiles', component: SharedfilesComponent },
        { path: 'trash', component: TrashComponent },
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
