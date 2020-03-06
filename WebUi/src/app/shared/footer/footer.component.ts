/*
 * @Author: CollapseNav
 * @Date: 2020-03-01 15:57:08
 * @LastEditors: CollapseNav
 * @LastEditTime: 2020-03-05 21:48:25
 * @Description:
 */
import { Component, HostBinding } from '@angular/core';

@Component({
  moduleId: module.id,
  // tslint:disable-next-line:component-selector
  selector: 'footer-cmp',
  templateUrl: 'footer.component.html'
})

export class FooterComponent {
  test: Date = new Date();
}
