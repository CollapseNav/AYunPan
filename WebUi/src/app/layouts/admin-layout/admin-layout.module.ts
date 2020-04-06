/*
 * @Author: CollapseNav
 * @Date: 2020-03-01 15:57:08
 * @LastEditors: CollapseNav
 * @LastEditTime: 2020-04-05 19:24:36
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
import { SharefileModuleComponent } from 'app/pages/sharefileModule/sharefileModule.component';
import { SharefileModuleModule } from 'app/pages/sharefileModule/sharefileModule.module';
import { TrashModuleComponent } from 'app/pages/trashModule/trashModule.component';
import { TrashModuleModule } from 'app/pages/trashModule/trashModule.module';

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
