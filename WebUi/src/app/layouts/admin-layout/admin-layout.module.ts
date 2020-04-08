/*
 * @Author: CollapseNav
 * @Date: 2020-03-01 15:57:08
 * @LastEditors: CollapseNav
 * @LastEditTime: 2020-04-08 14:55:51
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
import { UserfileModuleModule } from 'app/pages/userfileModule/userfileModule.module';
import { UserfileModuleComponent } from 'app/pages/userfileModule/userfileModule.component';
import { SharefileModuleComponent } from 'app/pages/sharefileModule/sharefileModule.component';
import { SharefileModuleModule } from 'app/pages/sharefileModule/sharefileModule.module';
import { TrashModuleComponent } from 'app/pages/trashModule/trashModule.component';
import { TrashModuleModule } from 'app/pages/trashModule/trashModule.module';
import { FilecomComponent } from 'app/shared/filecom/filecom.component';
import { TableComponent } from 'app/shared/table/table.component';
import { ToolTipComponent } from 'app/shared/toolTip/toolTip.component';
import { UploadmodalComponent } from 'app/shared/modal/uploadmodal/uploadmodal.component';
import { NewfoldermodalComponent } from 'app/shared/modal/newfoldermodal/newfoldermodal.component';
import { CheckmodalComponent } from 'app/shared/modal/checkmodal/checkmodal.component';
import { BreadcrumbComponent } from 'app/shared/toolTip/breadcrumb/breadcrumb.component';
import { BtndelComponent } from 'app/shared/table/button/btndel/btndel.component';
import { BtnshareComponent } from 'app/shared/table/button/btnshare/btnshare.component';
import { BtndownloadComponent } from 'app/shared/table/button/btndownload/btndownload.component';
import { BtnudelComponent } from 'app/shared/table/button/btnudel/btnudel.component';
import { BtnushareComponent } from 'app/shared/table/button/btnushare/btnushare.component';
import { BtntruedelComponent } from 'app/shared/table/button/btntruedel/btntruedel.component';
import { BtnaddfileComponent } from 'app/shared/table/button/btnaddfile/btnaddfile.component';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    FileUploadModule,
    AdminRoutingModule,
    UserfileModuleModule,
    SharefileModuleModule,
    TrashModuleModule,
  ],
  declarations: [
    InfoboardComponent,
    UserfilesComponent,
    SharedfilesComponent,
    TrashComponent,

    UserfileModuleComponent,
    SharefileModuleComponent,
    TrashModuleComponent,

    FilecomComponent,
    TableComponent,
    ToolTipComponent,

    UploadmodalComponent,
    NewfoldermodalComponent,
    CheckmodalComponent,
    BreadcrumbComponent,

    BtndelComponent,
    BtnshareComponent,
    BtndownloadComponent,
    BtnudelComponent,
    BtnushareComponent,
    BtntruedelComponent,
    BtnaddfileComponent,
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
