import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LimitmanagementRoutingModule } from './limitmanagement-routing.module';
import { LimitmanagementComponent } from './limitmanagement.component';
import { SalesProjectionComponent } from './components/sales-projection/sales-projection.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from 'src/app/core/modules/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    LimitmanagementComponent,
    SalesProjectionComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    LimitmanagementRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
   
    FormsModule
  ]
})
export class LimitmanagementModule { }
