import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { BsubjectService } from 'src/app/core/services/storage/bsubject.service';
import { LimitlistService } from '../../services/limitlist.service';

@Component({
  selector: 'app-approverlistdata',
  templateUrl: './approverlistdata.component.html',
  styleUrls: ['./approverlistdata.component.scss']
})
export class ApproverlistdataComponent implements OnInit {

  isOpen           :any ;
  approverlistData : any;
  constructor(private bs: BsubjectService, private router: Router,  private limitlistservice: LimitlistService) {
    this.bs.getSideMenus().subscribe((res: any) => {
      this.isOpen = res;
    })
   }
   ngOnInit(): void {
     this.getLimitlistdata()
  }

  goto(data: any){
    const navigationExtras: NavigationExtras = {
      state: data
    };
    // /limit/limitlist/limit-list-data limit-list-data
    this.router.navigate(['/limit/limitlist/raise-a-request'],navigationExtras);
  }

  async getLimitlistdata() {
  let qdata: any = {
    "KnoxID": "",
    "PartnerID": ""
  
  }
   this.limitlistservice.getAapproverListData(qdata).subscribe((res: any) => {
      console.log(res);
    this.approverlistData = res?.Response
  //  debugger
  console.log(this.approverlistData , "approval list");
  
  });
}
}




// isOpen:any;
// limitlistData : any;
// constructor(private bs: BsubjectService, private router: Router, private limitlistservice: LimitlistService) {
//   this.bs.getSideMenus().subscribe((res: any) => {
//     this.isOpen = res;
//   })
//  }

// ngOnInit(): void {
//   this.getLimitlistdata()
// }
// openreq(){
//   debugger
//   this.router.navigate(['limit/limitlist/raise-a-request'])
// }


// async getLimitlistdata() {
//   let qdata: any = {
//     "KnoxID": "",
//     "PartnerID": ""
  
//   }
//    this.limitlistservice.getLimitListData(qdata).subscribe((res: any) => {
//       console.log(res);
//     this.limitlistData = res?.Response
//   //  debugger
//   console.log(this.limitlistData , "limitslisfs");
  
//   });
// }
