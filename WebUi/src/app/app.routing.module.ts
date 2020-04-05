/*
 * @Author: CollapseNav
 * @Date: 2020-03-08 23:23:02
 * @LastEditors: CollapseNav
 * @LastEditTime: 2020-04-04 21:45:05
 * @Description:
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SignComponent } from './sign/sign.component';
import { SignGuard } from './guards/sign.guard';

const appRoutes: Routes = [
  { path: '', redirectTo: 'index', pathMatch: 'full' },
  {
    path: 'index', component: SignComponent,
    canActivate: [SignGuard]
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      {
        enableTracing: false, // <-- debugging purposes only
      }
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
