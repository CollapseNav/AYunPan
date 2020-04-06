/*
 * @Author: CollapseNav
 * @Date: 2020-04-02 21:52:29
 * @LastEditors: CollapseNav
 * @LastEditTime: 2020-04-05 18:54:46
 * @Description:
 */
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserFile } from 'app/unit/userFiles';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
})
export class BreadcrumbComponent implements OnInit {

  @Input() tableRouter: UserFile[] = [];

  @Output() turnBack = new EventEmitter<UserFile>();

  turnBackTo(item: UserFile) {
    this.turnBack.emit(item);
  }

  constructor() { }

  ngOnInit() {
  }

}
