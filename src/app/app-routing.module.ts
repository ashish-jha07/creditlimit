import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/services/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () => import('./modules/Authentication/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule),
    canActivate: [AuthGuard]
  }
  ,
  {
    path: 'master',
    loadChildren: () => import('./modules/mastermanagement/mastermanagement.module').then(m => m.MastermanagementModule),
    canActivate: [AuthGuard]

  },
  {
    path: 'limit',
    loadChildren: () => import('./modules/limitmanagement/limitmanagement.module').then(m => m.LimitmanagementModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'reports',
    loadChildren: () => import('./modules/reports/reports.module').then(m => m.ReportsModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'sap',
    loadChildren: () => import('./modules/sapupload/sapupload.module').then(m => m.SapuploadModule),
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
