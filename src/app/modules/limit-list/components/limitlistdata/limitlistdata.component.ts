import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsubjectService } from 'src/app/core/services/storage/bsubject.service';
import { LimitlistService } from '../../services/limitlist.service';

@Component({
  selector: 'app-limitlistdata',
  templateUrl: './limitlistdata.component.html',
  styleUrls: ['./limitlistdata.component.scss']
})
export class LimitlistdataComponent implements OnInit {
  isOpen:any;
  limitlistData : any;
  constructor(private bs: BsubjectService, private router: Router, private limitlistservice: LimitlistService) {
    this.bs.getSideMenus().subscribe((res: any) => {
      this.isOpen = res;
    })
   }

  ngOnInit(): void {
    this.getLimitlistdata()
  }
  openreq(){
    debugger
    this.router.navigate(['limit/limitlist/raise-a-request'])
  }


  async getLimitlistdata() {
    let qdata: any = {
      "KnoxID": "",
      "PartnerID": ""
    
    }
     this.limitlistservice.getLimitListData(qdata).subscribe((res: any) => {
        console.log(res);
      this.limitlistData = res?.Response
    //  debugger
    console.log(this.limitlistData , "limitslisfs");
    
    });
  }

}
