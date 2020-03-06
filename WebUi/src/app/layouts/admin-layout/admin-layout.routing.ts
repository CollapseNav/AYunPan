/*
 * @Author: CollapseNav
 * @Date: 2020-03-01 15:57:08
 * @LastEditors: CollapseNav
 * @LastEditTime: 2020-03-01 22:51:41
 * @Description:
 */
import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserComponent } from '../../pages/user/user.component';
import { TypographyComponent } from '../../pages/typography/typography.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { NotificationsComponent } from '../../pages/notifications/notifications.component';
import { UserfilesComponent } from 'app/pages/userfiles/userfiles.component';
import { InfoboardComponent } from 'app/pages/infoboard/infoboard.component';

export const AdminLayoutRoutes: Routes = [
  { path: 'userfiles', component: UserfilesComponent },
  { path: 'infoboard', component: InfoboardComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'user', component: UserComponent },
  { path: 'typography', component: TypographyComponent },
  { path: 'icons', component: IconsComponent },
  { path: 'notifications', component: NotificationsComponent },
];
