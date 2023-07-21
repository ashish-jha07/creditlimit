import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ApiEndPoints, ApiMethod } from 'src/app/core/services/constants/const';
import { HttpService } from 'src/app/core/services/http/http.service';
import { UiService } from 'src/app/core/services/ui/ui.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LimitlistService {

  constructor(private apiHttpService: HttpService, private ui : UiService, private http: HttpClient,) {

   }
   GetRequestLimitData(data  :any):Observable<any>{
   
    return this.apiHttpService.requestCall(ApiEndPoints.LIMITMANAGEMENT_GetRequestLimitData,ApiMethod.POST,data)?.pipe(
        map((res: any)=>{
      
          return res; 
        })
      )
  }
  GetApprovalList(data  :any):Observable<any>{
   
    return this.apiHttpService.requestCall(ApiEndPoints.LIMITMANAGEMENT_EmpSearchByUid,ApiMethod.POST,data)?.pipe(
        map((res: any)=>{
      
          return res; 
        })
      )
  }
  test(data  :any):Observable<any>{
    return this.http.post('http://192.168.10.76/RaiseRequest/Test',data)?.pipe(
      map((res: any)=>{
        //this.ui.openToastMessageLong(res?.Message, "show");
 
        return res; 
      })
      )
  }
   postLimitDeskboard(data  :any):Observable<any>{
   
    return this.apiHttpService.requestCall(ApiEndPoints.LIMITMANAGEMENT_RAISEREQUESTDASK,ApiMethod.POST,data)?.pipe(
        map((res: any)=>{
      
          return res; 
        })
      )
  }
  ApproverEditLimit(data :FormData):Observable<any>{
   
    return this.apiHttpService.requestCall(ApiEndPoints.LIMITMANAGEMENT_ApproverEditLimit,ApiMethod.POST,data)?.pipe(
        map((res: any)=>{
      
          return res; 
        })
      )
  }

  addUpdateDeleteLimit(data :FormData):Observable<any>{

   return this.http.post(environment.apiUrl+ApiEndPoints.LIMITMANAGEMENT_AddUpdateDeleteLimit,data)?.pipe(
    map((res: any)=>{
      // this.ui.openToastMessageLong(res?.Message, "show");

      return res; 
    })
  )
  

  }

  addSubmitApproval(data :FormData):Observable<any>{

    return this.http.post(environment.apiUrl+'RaiseRequest/SubmitApproval',data)?.pipe(
     map((res: any)=>{
       // this.ui.openToastMessageLong(res?.Message, "show");
 
       return res; 
     })
   )
   
 
   }
  getAddLimitPopUpData(data:any):Observable<any>{
   
    return this.apiHttpService.requestCall(ApiEndPoints.LIMITMANAGEMENT_GetAddLimitPopUpData,ApiMethod.POST,data)?.pipe(
        map((res: any)=>{
      
          return res; 
        })
      )
  }
  getAddLimitDropdownData(data:any):Observable<any>{
   
    return this.apiHttpService.requestCall(ApiEndPoints.LIMITMANAGEMENT_GetAddLimitDropdownData,ApiMethod.POST,data)?.pipe(
        map((res: any)=>{
      
          return res; 
        })
      )
  }

  SubmitRequest(data:any):Observable<any>{
   
    return this.apiHttpService.requestCall(ApiEndPoints.LIMITMANAGEMENT_SUBMIT_REQUEST,ApiMethod.POST,data)?.pipe(
      map((res)=>{
                 this.ui.openToastMessageLong(res?.Message, "show");

        console.log(res?.Response[0], "test123");
        
        // if(res.Response[0] == true) {
        //  this.ui.openToastMessageLong(res?.Message, "show");
        // }
        
        console.log(JSON.stringify( res?.Response))
         return res; 
       })
      )
  }


  getLimitListData(data:any):Observable<any>{
   
    return this.apiHttpService.requestCall(ApiEndPoints.LIMITMANAGEMENT_GetLIMITLIST,ApiMethod.POST,data)?.pipe(
        map((res: any)=>{
      
          return res; 
        })
      )
  }
  
  getAapproverListData(data:any):Observable<any>{
   
    return this.apiHttpService.requestCall(ApiEndPoints.LIMITMANAGEMENT_GetAPPROVERLIST,ApiMethod.POST,data)?.pipe(
        map((res: any)=>{
      
          return res; 
        })
      )
  }
  
  // Sunil http://192.168.10.178/RaiseRequest/SubmitRequest, use this api to submit data with remarks and approvers
}
