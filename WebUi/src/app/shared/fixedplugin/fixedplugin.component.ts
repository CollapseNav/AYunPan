/*
 * @Author: CollapseNav
 * @Date: 2020-03-01 15:57:08
 * @LastEditors: CollapseNav
 * @LastEditTime: 2020-03-01 16:49:46
 * @Description:
 */
import { Component, OnInit } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'fixedplugin-cmp',
  templateUrl: 'fixedplugin.component.html'
})

export class FixedPluginComponent implements OnInit {

  public sidebarColor = 'white';
  public sidebarActiveColor = 'danger';

  public state = true;

  changeSidebarColor(color) {
    const sidebar = <HTMLElement>document.querySelector('.sidebar');

    this.sidebarColor = color;
    if (sidebar !== undefined) {
      sidebar.setAttribute('data-color', color);
    }
  }
  changeSidebarActiveColor(color) {
    const sidebar = <HTMLElement>document.querySelector('.sidebar');
    this.sidebarActiveColor = color;
    if (sidebar !== undefined) {
      sidebar.setAttribute('data-active-color', color);
    }
  }
  ngOnInit() { }
}
