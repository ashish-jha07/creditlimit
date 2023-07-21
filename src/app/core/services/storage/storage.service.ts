import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UtilService } from '../util/util.service';
@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private cookies: CookieService, private _util: UtilService, private router: Router) { }

  saveToken(token: string): void
  {
    localStorage.setItem('jwt-token',token);
  }

  getToken()
  {
    return localStorage.getItem('jwt-token');
  }

  removeToken()
  {
    localStorage.removeItem('jwt-token');
  }

  setLocalObject(key: string, value: any)
  {
    localStorage.setItem(key, this._util.encrypt(JSON.stringify(value)));
  }

  getLocalObject(key: string)
  {
    if(localStorage.getItem(key))
    return JSON.parse(this._util.decrypt(localStorage.getItem(key) || ''));
    else
    return false;
  }

  /**
   * to get csrf token
   */
  getCsrfToken()
  {
    return this.cookies.get('csrftoken');
  }

  logout(){
    localStorage.removeItem('user');
    this.removeToken();
    this.router.navigate(['auth/logout']);
  }
}
