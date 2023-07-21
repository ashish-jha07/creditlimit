import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MastermanagementComponent } from './mastermanagement.component';
import { UploadexcelComponent } from './components/uploadexcel/uploadexcel.component';

const routes: Routes = [
  {
    path:'',
    component:MastermanagementComponent,
    children:[
      {
        path:'',
        redirectTo:'upload',
        pathMatch:'full'
      },
      {
        path:'upload',
      component:UploadexcelComponent,
      }
  
    ]
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MastermanagementRoutingModule { }
