import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScesuploadComponent } from './components/scesupload/scesupload.component';
import { SapuploadComponent } from './sapupload.component';

const routes: Routes = [
  {
    path:'',
    component:SapuploadComponent,
    children:[
      {
        path:'',
        redirectTo:'upload',
        pathMatch:'full'
      },
      {
        path:'upload',
      component:ScesuploadComponent,
      }
  
    ]
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SapuploadRoutingModule { }
