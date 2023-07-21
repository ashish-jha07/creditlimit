import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { HomeComponent } from './home.component';
import { HomedataResolver } from './services/homedata.resolver';

const routes: Routes = [
{
  path:'',
  component:HomeComponent,
  children:[
    {
      path:'',
      redirectTo:'welcome',
      pathMatch:'full'
    },
    {
      path:'welcome',
     component:WelcomeComponent,
     resolve: {
      RoleWiseData: HomedataResolver
    }
    }

    // ,
    // {
    //   path:'master',
  
    //   loadChildren:()=> import('./../../modules/mastermanagement/mastermanagement.module').then(m=> m.MastermanagementModule)
    
    // },
    // {
    //   path:'limit',
    //   loadChildren:()=> import('./../../modules/limitmanagement/limitmanagement.module').then(m=> m.LimitmanagementModule)
    // }
  ]
}

 

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
