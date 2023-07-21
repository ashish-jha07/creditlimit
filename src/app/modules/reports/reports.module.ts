import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsComponent } from './reports.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from 'src/app/core/modules/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomerreportComponent } from './components/customerreport/customerreport.component';
import { DownloadreportdetailComponent } from './components/downloadreportdetail/downloadreportdetail.component';



@NgModule({
  declarations: [
    ReportsComponent,
    CustomerreportComponent,
    DownloadreportdetailComponent,
   
  
  ],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    ReportsRoutingModule
  ]
})
export class ReportsModule { }
