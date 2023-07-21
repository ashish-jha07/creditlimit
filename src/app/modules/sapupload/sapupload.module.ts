import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SapuploadRoutingModule } from './sapupload-routing.module';
import { SapuploadComponent } from './sapupload.component';
import { ScesuploadComponent } from './components/scesupload/scesupload.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from 'src/app/core/modules/material/material.module';
import { DownloadreportdetailsComponent } from './components/downloadreportdetails/downloadreportdetails.component';


@NgModule({
  declarations: [
    SapuploadComponent,
    ScesuploadComponent,
    DownloadreportdetailsComponent
  ],
  imports: [
    CommonModule,
    SapuploadRoutingModule,
   
   
    SharedModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class SapuploadModule { }
