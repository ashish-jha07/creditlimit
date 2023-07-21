import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/core/services/http/http.service';
import { RoleWiseModules, RoleWiseResponse } from '../../interfaces/role-wise-modules';
import { HomeService } from '../../services/home.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  roleWiseData: any;
  constructor(private router:Router, private route: ActivatedRoute, private homeService: HomeService) { }

  ngOnInit(): void {
   
    this.roleWiseData =  this.route.snapshot.data['RoleWiseData'].Response[0].ParentModules;
    console.log("sunil "+ JSON.stringify(this.roleWiseData))
 
  }
  goToUpload(name: any) {
   
    if (name == 'Data Upload') { this.router.navigate(['master/upload']) }
    else if (name == 'Limit Management') {
      this.router.navigate(['limit/sales'])
    }  else if (name == 'Reports') {
      this.router.navigate(['reports/customer-report'])
    }  else if (name == 'SAP Upload') {
      this.router.navigate(['sap'])
    }
    
    else {
      this.router.navigate(['master/upload'])
    }
  }
  goToLimit( name : any){
    this.router.navigate(['limit/sales'])
  }

}
