import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ApiMethod, ApiEndPoints } from 'src/app/core/services/constants/const';
import { HttpService } from 'src/app/core/services/http/http.service';
import { environment } from 'src/environments/environment';
import { RequestGetModuleMasterDropdown, ResponseGetModuleMasterDropdown } from '../interface/master-dropdown';

@Injectable({
  providedIn: 'root'
})
 /** This service is used  for mastermanagement*/
export class MastermanagementService {

  constructor(private apiHttpService: HttpService, private http: HttpClient,) { }


 /**
  * @param data as rolecode
  * @returns list of masters
  */
  GetModuleMasterDropdown(data  :RequestGetModuleMasterDropdown):Observable<ResponseGetModuleMasterDropdown>{
    return this.apiHttpService.requestCall(ApiEndPoints.MASTERMANAGEMENT_GETMODULEMASTERDROPDOWN,ApiMethod.POST,data)?.pipe(
        map((res: ResponseGetModuleMasterDropdown)=>{
          return res;
        })
      )
  }
  
  /**
  * @param data as records and mastercode
  * @returns 
  */
  UploadMasters(data: any):Observable<any>{
    return this.apiHttpService.requestCall(ApiEndPoints.MASTERMANAGEMENT_UPLOADmASTERS,ApiMethod.POST,data)?.pipe(
      map((res: any)=>{
        return res;
      })
    )
  }
  uploadMaster2(data :FormData):Observable<any>{

    return this.http.post(environment.apiUrl+ApiEndPoints.​MASTERMANAGEMENT_UploadExcelMasters,data)?.pipe(
     map((res: any)=>{
       // this.ui.openToastMessageLong(res?.Message, "show");
 
       return res; 
     })
   )
   
 
   }

  /**
  * @param data as records and mastercode
  * @returns 
  */
   downloadMasters(data: any):Observable<any>{
    return this.apiHttpService.requestCall(ApiEndPoints.​MASTERMANAGEMENT_DOWNLOADMASTERS,ApiMethod.POST,data)?.pipe(
      map((res: any)=>{
        return res;
      })
    )
  }
}
