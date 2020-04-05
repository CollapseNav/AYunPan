/*
 * @Author: CollapseNav
 * @Date: 2020-03-01 15:57:08
 * @LastEditors: CollapseNav
 * @LastEditTime: 2020-04-05 12:58:52
 * @Description:
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserfilesComponent } from 'app/pages/userfiles/userfiles.component';
import { InfoboardComponent } from 'app/pages/infoboard/infoboard.component';
import { SharedfilesComponent } from 'app/pages/sharedfiles/sharedfiles.component';
import { TrashComponent } from 'app/pages/trash/trash.component';
import { AdminRoutingModule } from './admin.routing.module';
import { MainGuard } from 'app/guards/main.guard';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from 'app/interceptors/token.interceptor';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FileUploadModule } from 'ng2-file-upload';
import { UploadmodalComponent } from 'app/pages/shared/modal/uploadmodal/uploadmodal.component';
import { NewfoldermodalComponent } from 'app/pages/shared/modal/newfoldermodal/newfoldermodal.component';
import { BreadcrumbComponent } from 'app/pages/shared/toolTip/breadcrumb/breadcrumb.component';
import { ToolTipComponent } from 'app/pages/shared/toolTip/toolTip.component';
import { BtndelComponent } from 'app/pages/shared/table/button/btndel/btndel.component';
import { BtndownloadComponent } from 'app/pages/shared/table/button/btndownload/btndownload.component';
import { BtnudelComponent } from 'app/pages/shared/table/button/btnudel/btnudel.component';
import { BtnushareComponent } from 'app/pages/shared/table/button/btnushare/btnushare.component';
import { BtnshareComponent } from 'app/pages/shared/table/button/btnshare/btnshare.component';
import { FilecomComponent } from 'app/pages/shared/filecom/filecom.component';
import { TableComponent } from 'app/pages/shared/table/table.component';
import { CheckmodalComponent } from 'app/pages/shared/modal/checkmodal/checkmodal.component';
import { UserfileModuleModule } from 'app/pages/userfileModule/userfileModule.module';
import { UserfileModuleComponent } from 'app/pages/userfileModule/userfileModule.component';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    FileUploadModule,
    AdminRoutingModule,
    UserfileModuleModule,
  ],
  declarations: [
    InfoboardComponent,
    UserfilesComponent,
    SharedfilesComponent,
    TrashComponent,
    FilecomComponent,
    TableComponent,
    ToolTipComponent,
    UserfileModuleComponent,

    UploadmodalComponent,
    NewfoldermodalComponent,
    CheckmodalComponent,
    BreadcrumbComponent,

    BtndelComponent,
    BtnshareComponent,
    BtndownloadComponent,
    BtnudelComponent,
    BtnushareComponent,
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
