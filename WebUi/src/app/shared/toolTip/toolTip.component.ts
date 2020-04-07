/*
 * @Author: CollapseNav
 * @Date: 2020-04-02 22:45:43
 * @LastEditors: CollapseNav
 * @LastEditTime: 2020-04-05 13:04:06
 * @Description:
 */
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserFile, FileTypes } from 'app/unit/userFiles';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-tooltip',
  templateUrl: './toolTip.component.html',
})
export class ToolTipComponent implements OnInit {

  _tableRouter: UserFile[] = [];

  @Input() hasBreadCrumb = true;
  @Input() hasNewFileTools = false;
  @Input() hasSearch = true;
  @Input() set tableRouter(item: UserFile) {
    if (!!item) {
      this._tableRouter.push(item);
    }
  }

  @Output() turnBack = new EventEmitter<UserFile>();
  @Output() search = new EventEmitter<UserFile[]>();

  openUploadModal(modal) {
    this.modalService.open(modal, { centered: true, size: 'lg' });
  }
  openNewFolder(modal) {
    this.modalService.open(modal, { centered: true });
  }

  getThisFolder() {
    return this._tableRouter.slice(-1)[0];
  }

  addNewRouterPoint(item: UserFile) {
    this._tableRouter.push(item);
  }

  // 面包屑导航
  turnBackTo(item: UserFile) {
    this.turnBack.emit(item);
    const temp = this._tableRouter.slice(0, this._tableRouter.findIndex(folder => folder.id === item.id) + 1);
    this._tableRouter = temp;
  }

  searchFile(value: string) {
    if (value === '') {
      this.turnBackTo(this.getThisFolder());
      return;
    }
    const searchlist: UserFile[] = this.filterFile(this.getThisFolder().fileContains, value);
    this.search.emit(searchlist);
  }

  clearSearch(control) {
    control.value = '';
    this.turnBackTo(this.getThisFolder());
  }

  private filterFile(folders: UserFile[], filter: string) {
    const list = folders.filter(item => item.fileName.toLowerCase().indexOf(filter) >= 0 && item.fileTypes !== FileTypes.folder);
    folders = folders.filter(item => item.fileTypes === FileTypes.folder);
    folders.forEach(item => {
      if (item.fileContains != null) {
        this.filterFile(item.fileContains, filter).forEach(file => {
          list.push(file);
        })
      }
    });
    return list;
  }

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
  }

}
