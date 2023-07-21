import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ApiMethod, ApiEndPoints } from '../constants/const';
import { ErrorService } from '../error/error.service';
import { environment } from 'src/environments/environment';
import { UiService } from '../ui/ui.service';
import { LoaderService } from '../ui/loader.service';
import { StorageService } from '../storage/storage.service';
// import { Observavle } from 'rxjs/operators/'

@Injectable({
  providedIn: 'root'
})
export class HttpService {
 headers = new HttpHeaders({
    
    'Content-Type': 'application/json'
});
  methods!: ApiMethod;

  constructor(private http: HttpClient,private storage : StorageService,  private error :ErrorService,  private ui:UiService, private loader : LoaderService) { }


/**
   * This function is used to make API calls, you will only have to call this function,
   * pass a method name, API URL, and some data if you want to do put or post calls,
   * and process its response, any changes to the HTTP service will have to be applied here
   * @param API path of the API
   * @param method name of the API method
   * @param data any required data for put or post calls
   * @returns data or error response of the API call
   */ 

  requestCall(api : ApiEndPoints, method: ApiMethod, data?: any) :Observable<any>
  {
    let response :any;
    switch(method)
    {
      case ApiMethod.GET:
        response = this.http.get<any>(`${environment.apiUrl}${api}`,{headers :this.headers})
        .pipe(catchError((err) => this.handleError(err, this)));
        break;
      
      case ApiMethod.POST:
        response = this.http.post<any>(`${environment.apiUrl}${api}`, data,{headers :this.headers})
        .pipe(catchError(err => this.handleError(err, this)));
        break;

      case ApiMethod.PUT:
        response = this.http.put<any>(`${environment.apiUrl}${api}`, data)
        .pipe(catchError((err) => this.handleError(err, this)));
        break;

      case ApiMethod.DELETE:
        response = this.http.delete<any>(`${environment.apiUrl}${api}`)
        .pipe(catchError((err) => this.handleError(err, this)));
        break;

     default:
       break;
    }
    return response;
  }

  handleError(error: HttpErrorResponse, self: any)
  {
    this.loader.hide()   
    if(error.error instanceof ErrorEvent){
      this.ui.openToastMessage(error.error.message, 'error');
      if(error?.status == 401 || error?.status == 0){
       
        this.storage.logout();
      }
      console.error('An error occured:', error.error.message)

    }
   
    else
    {

      this.ui.openToastMessage(error?.status +"  "+error.message, 'error');
      if(error?.status == 401 || error?.status == 0){
       
        this.storage.logout();
      }
      this.error.whichError( error?.status, error.message);
     
    }
    return throwError(() => new Error(error.error));
  }


}
