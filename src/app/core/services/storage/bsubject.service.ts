import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BsubjectService {
  private epSideMenu$: BehaviorSubject<any> = new BehaviorSubject(null);
  private approvalData$: BehaviorSubject<any> = new BehaviorSubject(null);
  constructor() { }
  getSideMenus(): Observable<any> {
    return this.epSideMenu$.asObservable();
}

setSideMenus(data: any) {
    this.epSideMenu$.next(data);
}
}
