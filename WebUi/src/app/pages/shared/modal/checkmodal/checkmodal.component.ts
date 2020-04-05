/*
 * @Author: CollapseNav
 * @Date: 2020-04-03 21:17:10
 * @LastEditors: CollapseNav
 * @LastEditTime: 2020-04-04 13:44:35
 * @Description:
 */
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { UserFile } from 'app/unit/userFiles';

@Component({
  selector: 'app-checkmodal',
  templateUrl: './checkmodal.component.html',
  styleUrls: ['./checkmodal.component.scss']
})
export class CheckmodalComponent implements OnInit {

  @Input() file: UserFile;

  @Output() check = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

}
