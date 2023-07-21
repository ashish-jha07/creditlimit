import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { parse } from 'path';
import { map, Observable } from 'rxjs';
import { ApiEndPoints, ApiMethod } from 'src/app/core/services/constants/const';
import { HttpService } from 'src/app/core/services/http/http.service';
import { UiService } from 'src/app/core/services/ui/ui.service';
import { CommanDialogComponent } from '../../shared/components/comman-dialog/comman-dialog.component';
import { DownLoadSalesReq, DownLoadSalesResponse, SalesProjectionReq, SalesProjectionResponse } from '../interfaces/sales';

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  constructor(private apiHttpService: HttpService, private ui : UiService, ) { }
  
  openDialog( title: any, message : any): void {
    
  }
 /**
  * @param data as rolecode
  * @returns list of masters
  */
  getSalesProjection(data  :DownLoadSalesReq):Observable<DownLoadSalesResponse>{
   
    return this.apiHttpService.requestCall(ApiEndPoints.LIMITMANAGEMENT_DOWNLOAD_SALES,ApiMethod.POST,data)?.pipe(
        map((res: DownLoadSalesResponse)=>{
         if(res.Response[0] == "") {
          this.ui.openToastMessage(" No Records Found ", 'show');
         }
         
         console.log(JSON.stringify( res?.Response))
          return res; 
        })
      )
  }

  postSalesProjection(data  :SalesProjectionReq):Observable<SalesProjectionResponse>{
   
    return this.apiHttpService.requestCall(ApiEndPoints.LIMITMANAGEMENT_UPLOAD_SALES,ApiMethod.POST,data)?.pipe(
        map((res: SalesProjectionResponse)=>{
         if(res.Response[0] == "") {
          this.ui.openToastMessage(" All records upload "+ res?.Message, 'show');
         }
         
         console.log(JSON.stringify( res?.Response))
          return res; 
        })
      )
  }

  getRegion(data  :any):Observable<any>{
   
    return this.apiHttpService.requestCall(ApiEndPoints.LIMITMANAGEMENT_GET_REGIONES,ApiMethod.POST,data)?.pipe(
        map((res: any)=>{
     
      
         console.log(JSON.stringify( res?.Response))
          return res; 
        })
      )
  }
}
