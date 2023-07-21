import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiEndPoints, ApiMethod, AuthEndPoints } from 'src/app/core/services/constants/const';

import { HttpService } from 'src/app/core/services/http/http.service';
import { StorageService } from 'src/app/core/services/storage/storage.service';
import { environment } from 'src/environments/environment';
import { ReqRoleWiseModule, RoleWiseModules } from '../interfaces/role-wise-modules';

@Injectable({
  providedIn: 'root',
})
export class HomeService {

  constructor(  private http: HttpClient, private httpService: HttpService,private storage: StorageService,  ) { }
  getRoleWiseModule():  Observable<RoleWiseModules>  {
    let user = this.storage.getLocalObject('user');
    let data : ReqRoleWiseModule = {
      "RoleCode": user.Role
    }
    debugger
    // const headers = { 'content-type': 'application/json'}  
    // const body=JSON.stringify(data);
    // console.log(body)
    // return this.http.post<RoleWiseModules>(environment.apiUrl + AuthEndPoints.GETROLEWISEMODULES, body,{'headers':headers})
    return  this.httpService.requestCall(ApiEndPoints.GETROLE_WISE_MODULES, ApiMethod.POST, data);
  
  }

  
}
