import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { SubHeaderComponent } from './components/sub-header/sub-header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { CommanDialogComponent } from './components/comman-dialog/comman-dialog.component';
import { MaterialModule } from 'src/app/core/modules/material/material.module';
import { ChartsComponent } from './components/charts/charts.component';
import { LineandbarComponent } from './components/lineandbar/lineandbar.component';
import { LinechartComponent } from './components/linechart/linechart.component';
import { BarchartComponent } from './components/barchart/barchart.component';
import { TwobarchartComponent } from './components/twobarchart/twobarchart.component';
import { LineandbarwithoneyaxisComponent } from './components/lineandbarwithoneyaxis/lineandbarwithoneyaxis.component';
import { TwolineandonebarComponent } from './components/twolineandonebar/twolineandonebar.component';
import { LoaderComponent } from './components/loader/loader.component';
import { CreditlimitChartComponent } from './components/creditlimit-chart/creditlimit-chart.component';
import { DialogMasteruploadComponent } from './components/dialog-masterupload/dialog-masterupload.component';
import { PartnerinvestmentComponent } from './components/partnerinvestment/partnerinvestment.component';
import { ConfirmdialogComponent } from './components/confirmdialog/confirmdialog.component';
import { CommonResponseDialogComponent } from './components/common-response-dialog/common-response-dialog.component';
import { LogoutConfirmdialogComponent } from './components/logout-confirmdialog/logout-confirmdialog.component';
import { DialogsalesprojectionComponent } from './components/dialogsalesprojection/dialogsalesprojection.component';



@NgModule({
  declarations: [
    HeaderComponent,
    SubHeaderComponent,
    SidebarComponent,
    CommanDialogComponent,
    ChartsComponent,
  
    LineandbarComponent,
    LinechartComponent,
    BarchartComponent,
    TwobarchartComponent,
    LineandbarwithoneyaxisComponent,
    TwolineandonebarComponent,
    LoaderComponent,
    CreditlimitChartComponent,
    DialogMasteruploadComponent,
    PartnerinvestmentComponent,
    ConfirmdialogComponent,
    CommonResponseDialogComponent,
    LogoutConfirmdialogComponent,
    DialogsalesprojectionComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
   exports:[
    HeaderComponent,
    SubHeaderComponent,
    SidebarComponent,
    CommanDialogComponent,
    ChartsComponent,
    LineandbarComponent,
    LinechartComponent,
    BarchartComponent,
    TwobarchartComponent,
    LineandbarwithoneyaxisComponent,
    TwolineandonebarComponent,
    LoaderComponent,
    CreditlimitChartComponent,
    PartnerinvestmentComponent,
    ConfirmdialogComponent,
    LogoutConfirmdialogComponent,
    DialogsalesprojectionComponent
  ]
})
export class SharedModule { }
