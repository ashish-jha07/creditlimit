import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './componenet/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/core/modules/material/material.module';
import { RedirectComponent } from './componenet/redirect/redirect.component';
import { LogoutComponent } from './componenet/logout/logout.component';


const routes: Routes = [
  {
    path:'',
    redirectTo:'login',
    pathMatch:'full'
  },
  {
    path:'login',
    component : LoginComponent
  },
  {
    path:'redirect',
    component : RedirectComponent
  },
  {
    path:'logout',
    component : LogoutComponent
  }
  
];


@NgModule({
  declarations: [ LoginComponent, RedirectComponent, LogoutComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
  ], 
  exports: [RouterModule]
})
export class AuthModule { }
