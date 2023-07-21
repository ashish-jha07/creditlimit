import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomedataResolver } from './modules/home/services/homedata.resolver';
import { HomeService } from './modules/home/services/home.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { JwtInterceptor } from './core/services/interceptors/jwt.interceptor';

import { MAT_DATE_LOCALE } from '@angular/material/core';
import { SharedModule } from './modules/shared/shared.module';
import { LoaderService } from './core/services/ui/loader.service';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatSnackBarModule,
    SharedModule
  ],
  providers: [
    HomedataResolver,
    HomeService,
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    {provide: MAT_DATE_LOCALE, useValue: 'en-US'},
    LoaderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
