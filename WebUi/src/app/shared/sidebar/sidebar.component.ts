/*
 * @Author: CollapseNav
 * @Date: 2020-03-01 15:57:08
 * @LastEditors: CollapseNav
 * @LastEditTime: 2020-03-16 01:38:30
 * @Description:
 */
import { Component, OnInit } from '@angular/core';

export interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}

export const ROUTES: RouteInfo[] = [
  { path: './infoboard', title: 'Info Board', icon: 'nc-badge', class: '' },
  { path: './userfiles', title: 'UserFiles', icon: 'nc-bullet-list-67', class: '' },
  { path: './sharedfiles', title: 'SharedFiles', icon: 'nc-share-66', class: '' },
  { path: './trash', title: 'Trash', icon: 'nc-basket', class: '' },
];

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'sidebar-cmp',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnInit {
  public menuItems: any[];
  constructor() { }
  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
}
