import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';

import { HomeComponent } from './home.component';

import { SharedModule } from '../shared/shared.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from 'src/app/core/services/interceptors/jwt.interceptor';
import { HomedataResolver } from './services/homedata.resolver';
import { HomeService } from './services/home.service';
import { WelcomeComponent } from './components/welcome/welcome.component';


@NgModule({
  declarations: [
    
    HomeComponent,
         WelcomeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule
  ],
  providers:[
    HomedataResolver,
   
    
  ]
})
export class HomeModule { }
