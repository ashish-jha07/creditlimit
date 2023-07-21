import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StorageService } from '../storage/storage.service';
import { Router } from '@angular/router';
import { UiService } from '../ui/ui.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private storage : StorageService, private router: Router,  private ui:UiService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
 
    const token = localStorage.getItem('jwt-token');
    const isApiUrl = request.url.startsWith(environment.apiUrl);

    if (token) {

      // if (request.url.includes("AddUpdateImageGallery")) {
      //   request = request.clone({
      //     setHeaders: {
      //       Authorization: token
      //       //'Content-Type': 'multipart/form-data;boundary=<calculated when request is sent>'                 
      //     }
      //   });
      // }
      // else {


      //   if (request.url.includes("AddUpdateBanner")) {

      //     request = request.clone({
      //       setHeaders: {
      //         Authorization: token
      //         //'Content-Type': 'multipart/form-data;boundary=<calculated when request is sent>'                 
      //       }
      //     });
      //   }
      //   else {
      //     request = request.clone({
      //       setHeaders: {
      //         Authorization: token,
      //         'Content-Type': 'application/json'
      //       }
      //     });
      //   }

      // }

      if (request.url.includes("AddUpdateDeleteLimit")){
      
        request = request.clone({
          setHeaders: {
            Authorization: token,
         //   'Content-Type': 'multipart/form-data'
          }
        });
        
      }else if (request.url.includes("SubmitApproval")){
      
        request = request.clone({
          setHeaders: {
            Authorization: token,
         //   'Content-Type': 'multipart/form-data'
          }
        });
      
      }else if (request.url.includes("UploadExcelMasters")){
      
        request = request.clone({
          setHeaders: {
            Authorization: token,
         //   'Content-Type': 'multipart/form-data'
          }
        });
      
      } else{
    
        request = request.clone({
          setHeaders: {
            Authorization: token,
            'Content-Type': 'application/json'
          }
        });
      }
    
    }else
    request = request.clone({
      setHeaders: {
        'Content-Type': 'application/json'
      }
    });
 
    return next.handle(request).pipe(map((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
      
         event = event.clone({body: this.modifyBody(event.body)});
         
      }
      return event;
  }));

  }
  private modifyBody(body: any) {
    if(body.StatusCode === 3){
      this.ui.openToastMessage(body.Message, 'Session error  ');
      this.storage.logout();
     
    }
  
  }
}
