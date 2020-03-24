/*
 * @Author: CollapseNav
 * @Date: 2020-03-01 15:57:08
 * @LastEditors: CollapseNav
 * @LastEditTime: 2020-03-24 23:23:15
 * @Description:
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ChartsModule } from 'ng2-charts';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserfilesComponent } from 'app/pages/userfiles/userfiles.component';
import { InfoboardComponent } from 'app/pages/infoboard/infoboard.component';
import { SharedfilesComponent } from 'app/pages/sharedfiles/sharedfiles.component';
import { TrashComponent } from 'app/pages/trash/trash.component';
import { AdminRoutingModule } from './admin.routing.module';
import { FileUploadModule } from 'ng2-file-upload';
import { NgxUploaderModule } from 'ngx-uploader';
import { MainGuard } from 'app/guards/main.guard';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from 'app/interceptors/token.interceptor';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ChartsModule,
    FileUploadModule,
    NgxUploaderModule,
    NgbModule,
    AdminRoutingModule,
  ],
  declarations: [
    UserfilesComponent,
    SharedfilesComponent,
    TrashComponent,
    InfoboardComponent,

  ],
  providers: [
    MainGuard, {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    }
  ]
})
export class AdminLayoutModule { }
