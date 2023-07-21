import { Injectable } from '@angular/core';
import { ApiEndPoints, ApiMethod } from 'src/app/core/services/constants/const';
import { HttpService } from 'src/app/core/services/http/http.service';
import { StorageService } from 'src/app/core/services/storage/storage.service';
import { LoginUser } from '../Interfaces/auth.interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(  private httpService: HttpService,private storage : StorageService ) { }
  getssourl( cb?:any):  any  {
    let data : any = {
  //  "CallbackUrl":''
    }
   
      this.httpService.requestCall(ApiEndPoints.RaiseRequest_GetSSOUrl, ApiMethod.POST, data).subscribe((res:LoginUser)=>{
        if(res.IsSucsess){
          cb(res);
        }
      });
  
  }
  loginbyBackend(UserName : any, cb?:any):  any  {
    let data : any = {
  "UserName":UserName,
//"UserName":"vikas sethi",
      "Password": '',
      "IsSSO": true,
      "StaticKey": 'f48ba13f-e0fe-4ee8-9d81-f20689892503'
    //  StaticKey:''
    }
   
      this.httpService.requestCall(ApiEndPoints.LOGIN, ApiMethod.POST, data).subscribe((res:LoginUser)=>{
        if(res.IsSucsess){
          this.storage.saveToken(res.Response[0].JwtToken);
          this.storage.setLocalObject('user',res.Response[0]);
       
          cb(res);
        }
      });
  
  }
  login1(cb?:any):  any  {
    let data : any = {
      "UserName":'',
      "Password": '',
      "IsSSO": true
    }
   
      this.httpService.requestCall(ApiEndPoints.LOGIN, ApiMethod.POST, data).subscribe((res:LoginUser)=>{
        if(res.IsSucsess){
          if(res.StatusCode != 0){
          this.storage.saveToken(res.Response[0].JwtToken);
          this.storage.setLocalObject('user',res.Response[0]);
          }
          cb(res);
        }
      });
  
  }
  login(username:any, password: any, cb?:any):  any  {
    let data : any = {
      "UserName":username,
      "Password": password,
      "IsSSO": false,
      "StaticKey": ''
    }
   
      this.httpService.requestCall(ApiEndPoints.LOGIN, ApiMethod.POST, data).subscribe((res:LoginUser)=>{
        if(res.IsSucsess){
          this.storage.saveToken(res.Response[0].JwtToken);
          this.storage.setLocalObject('user',res.Response[0]);
       
          cb(res);
        }
      });
  
  }

  isLogin():boolean{
    
  let user =  this.storage.getLocalObject('user');
    let token =  this.storage.getToken();
    if(user && token)
    return true;
    else
    return false;
  }
}
