/*
 * @Author: CollapseNav
 * @Date: 2020-04-02 21:52:29
 * @LastEditors: CollapseNav
 * @LastEditTime: 2020-04-02 23:45:10
 * @Description:
 */
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserFile } from 'app/unit/userFiles';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
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
