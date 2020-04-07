/*
 * @Author: CollapseNav
 * @Date: 2020-04-03 00:05:34
 * @LastEditors: CollapseNav
 * @LastEditTime: 2020-04-05 18:53:59
 * @Description:
 */
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UserFilesService } from 'app/services/userfiles/userFiles.service';
import { UserFile } from 'app/unit/userFiles';

@Component({
  selector: 'app-newfoldermodal',
  templateUrl: './newfoldermodal.component.html',
})
export class NewfoldermodalComponent implements OnInit {
  @Input() rootFolder: UserFile;
  // 可能有点多余的一个formgroup，主要是存一下新建文件夹时输入的名称，后面可能会加点什么东西吧
  newFolderForm: FormGroup;
  createNewFolder() {
    // tslint:disable-next-line:max-line-length
    this.fileService.createNewFolder({ 'folderName': this.newFolderForm.value['folderName'], 'Id': this.rootFolder.id }).subscribe(result => {
      this.rootFolder.fileContains.push(result);
    })
  }
  constructor(
    private fileService: UserFilesService,
    private build: FormBuilder) { }

  ngOnInit() {
    // 感觉这个formgroup暂时有点多余
    this.newFolderForm = this.build.group({
      folderName: '',
    });
  }

}
