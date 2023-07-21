import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MastermanagementRoutingModule } from './mastermanagement-routing.module';
import { UploadexcelComponent } from './components/uploadexcel/uploadexcel.component';
import { MastermanagementComponent } from './mastermanagement.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from 'src/app/core/modules/material/material.module';
import { UiService } from 'src/app/core/services/ui/ui.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpService } from 'src/app/core/services/http/http.service';
import { MastermanagementService } from './service/mastermanagement.service';



@NgModule({
  declarations: [
    UploadexcelComponent,
    MastermanagementComponent,
    
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MastermanagementRoutingModule,
    SharedModule,
    MaterialModule,
    
  ],
  providers: [UiService, HttpService, MastermanagementService]
})
export class MastermanagementModule { }
