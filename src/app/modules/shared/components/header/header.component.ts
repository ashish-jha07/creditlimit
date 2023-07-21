import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BsubjectService } from 'src/app/core/services/storage/bsubject.service';
import { StorageService } from 'src/app/core/services/storage/storage.service';
import { LoginUserResponse } from 'src/app/modules/Authentication/Interfaces/auth.interfaces';
import { LogoutConfirmdialogComponent } from '../logout-confirmdialog/logout-confirmdialog.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
 user : LoginUserResponse | undefined;
  constructor(public dialog: MatDialog, private storage : StorageService, private router: Router, private bs : BsubjectService) { }
  @Input() showmenu: string | undefined ;
  isOpen: any;
  ngOnInit(): void {
   this.user = this.storage.getLocalObject('user');

   this.bs.getSideMenus().subscribe((res: any)=>{
    this.isOpen = res;
   })
  }
  logOut(){
 
    this.storage.logout();
   
  }
  changeBs(data: any){
    
    this.bs.setSideMenus(data);
    this.bs.getSideMenus().subscribe((res: any)=>{
      this.isOpen = res;
     })
  }


  logoutConfirmation() {
    const dialogRef = this.dialog.open(LogoutConfirmdialogComponent, {

    });

    dialogRef.afterClosed().subscribe((result:any) => {

      if (result) {
       this.logOut()
    
        
      }
      //this.animal = result;
    });
    // console.log(item);
    debugger
   
  }
}
