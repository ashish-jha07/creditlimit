import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApproverDashboardComponent } from './components/approver-dashboard/approver-dashboard.component';
import { ApproverlistdataComponent } from './components/approverlistdata/approverlistdata.component';
import { LimitDashboardComponent } from './components/limit-dashboard/limit-dashboard.component';
import { LimitRaiseARequestComponent } from './components/limit-raise-arequest/limit-raise-arequest.component';
import { LimitlistdataComponent } from './components/limitlistdata/limitlistdata.component';
import { LimitListComponent } from './limit-list.component';

const routes: Routes = [
  {
    path:'',
    component:LimitListComponent,
    children:[
      {
        path:'',
        redirectTo:'limit-list-data',
        pathMatch:'full'
      },
      {
        path:'limit-list-data',
      component:LimitlistdataComponent,
      },
      {
        path:'raise-a-request',
      component:LimitRaiseARequestComponent,
      },
      {
        path:'approver-list-data',
        component:ApproverlistdataComponent,
      },
  
      {
        path:'dashboard',
        component:ApproverDashboardComponent,
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LimitListRoutingModule { }
