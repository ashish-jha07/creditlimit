import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { HomeModule } from '../home.module';
import { RoleWiseModules, RoleWiseResponse } from '../interfaces/role-wise-modules';
import { HomeService } from './home.service';

@Injectable({
  providedIn: 'root',
})
export class HomedataResolver implements Resolve<RoleWiseModules> {
  constructor(private homeService: HomeService){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<RoleWiseModules>  {
 
    let apidata :Observable<RoleWiseModules> = this.homeService.getRoleWiseModule();

    return apidata;
  }
}
