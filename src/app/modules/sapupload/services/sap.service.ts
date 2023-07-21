import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ApiEndPoints, ApiMethod } from 'src/app/core/services/constants/const';
import { HttpService } from 'src/app/core/services/http/http.service';

@Injectable({
  providedIn: 'root'
})
export class SapService {

  constructor(private apiHttpService: HttpService) { }


  /**
   * @param data as rolecode
   * @returns list of masters
   */
   GetDownloadSAPUpload(data  :any):Observable<any>{
     return this.apiHttpService.requestCall(ApiEndPoints.SAPUpload_DownloadSAPUpload,ApiMethod.POST,data)?.pipe(
         map((res: any)=>{
           return res;
         })
       )
   }
}
