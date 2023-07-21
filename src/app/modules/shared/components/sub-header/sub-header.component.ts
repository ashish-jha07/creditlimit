import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { RoleWiseModules, RoleWiseResponse } from 'src/app/modules/home/interfaces/role-wise-modules';
import { HomeService } from 'src/app/modules/home/services/home.service';

@Component({
  selector: 'app-sub-header',
  templateUrl: './sub-header.component.html',
  styleUrls: ['./sub-header.component.scss']
})
export class SubHeaderComponent implements OnInit {
@Input() type: string | undefined  ;
roleWiseArray : any ;
  constructor(private router:Router,  private homeService: HomeService ) {
     this.homeService.getRoleWiseModule().subscribe((res: RoleWiseModules)=>{
       this.roleWiseArray = res?.Response[0]?.ParentModules
     })
   }

  ngOnInit(): void {
   
  }
  goTo(path: any){
    if(path == 'Limit Management'){
      this.router.navigate(['limit/sales'])
    } else if (path == 'Reports') {
      this.router.navigate(['reports/customer-report'])
    } else if(path == 'Limit Management'){
      this.router.navigate(['limit/sales'])
    } else if (path == 'SAP Upload') {
      this.router.navigate(['sap'])
    }
    else{
      this.router.navigate(['master/upload'])
    }
  }
}
