import { NgModule } from '@angular/core';
import { CommonModule, LocationStrategy, PathLocationStrategy } from '@angular/common';

import { LimitListRoutingModule } from './limit-list-routing.module';
import { LimitListComponent } from './limit-list.component';
import { LimitlistdataComponent } from './components/limitlistdata/limitlistdata.component';
import { LimitRaiseARequestComponent } from './components/limit-raise-arequest/limit-raise-arequest.component';
import { LimitDashboardComponent } from './components/limit-dashboard/limit-dashboard.component';
import { MaterialModule } from 'src/app/core/modules/material/material.module';
import { SharedModule } from '../shared/shared.module';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DummyDaskboardComponent } from './components/dummy-daskboard/dummy-daskboard.component';
import { AddLimitModalComponent } from './components/add-limit-modal/add-limit-modal.component';
//import { PartnerinvestmentComponent } from '../shared/components/partnerinvestment/partnerinvestment.component';
import { UiService } from 'src/app/core/services/ui/ui.service';
import { LimitDeshboardNewComponent } from './components/limit-deshboard-new/limit-deshboard-new.component';
import { ApproverlistdataComponent } from './components/approverlistdata/approverlistdata.component';
import { ApproverDashboardComponent } from './components/approver-dashboard/approver-dashboard.component';
import { SplitPipe } from 'src/app/core/pipes/namefilter.pipe';


@NgModule({
  declarations: [
    LimitListComponent,
    LimitlistdataComponent,
    LimitRaiseARequestComponent,
    LimitDashboardComponent,
    DummyDaskboardComponent,
    AddLimitModalComponent,
 //   PartnerinvestmentComponent,
    LimitDeshboardNewComponent,
 ApproverlistdataComponent,
 ApproverDashboardComponent,
 SplitPipe
  ],
  imports: [
    CommonModule,
    LimitListRoutingModule,
    MaterialModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [UiService,
   
  ]
})
export class LimitListModule { }
