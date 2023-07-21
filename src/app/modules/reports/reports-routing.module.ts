import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerreportComponent } from './components/customerreport/customerreport.component';
import { ReportsComponent } from './reports.component';

const routes: Routes = [
  {
    path:'',
    component:ReportsComponent,
    children:[
      {
        path:'',
        redirectTo:'customer-report',
        pathMatch:'full'
      },
      {
        path:'customer-report',
      component:CustomerreportComponent,
      },
      
    
  
    ]
  }
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
