import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SalesProjectionComponent } from './components/sales-projection/sales-projection.component';
import { LimitmanagementComponent } from './limitmanagement.component';

const routes: Routes = [
  {
    path:'',
    component:LimitmanagementComponent,
    children:[
      {
        path:'',
        redirectTo:'sales',
        pathMatch:'full'
      },
      {
        path:'sales',
      component:SalesProjectionComponent,
      },
      
    {
      path:'limitlist',
      loadChildren:()=> import('./../../modules/limit-list/limit-list.module').then(m=> m.LimitListModule)
    }
  
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LimitmanagementRoutingModule { }
