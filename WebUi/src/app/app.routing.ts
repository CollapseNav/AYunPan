/*
 * @Author: CollapseNav
 * @Date: 2020-03-01 15:57:08
 * @LastEditors: CollapseNav
 * @LastEditTime: 2020-03-02 01:44:52
 * @Description:
 */
import { Routes } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';

export const AppRoutes: Routes = [
  {
    path: '',
    redirectTo: 'infoboard',
    pathMatch: 'full',
  },
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
      }]
  },
  {
    path: '**',
    redirectTo: 'infoboard'
  }
]
