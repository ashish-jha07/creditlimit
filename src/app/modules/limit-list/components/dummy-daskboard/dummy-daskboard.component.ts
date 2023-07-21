import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {startWith, map} from 'rxjs/operators';
import { LimitlistService } from '../../services/limitlist.service';
import { StorageService } from 'src/app/core/services/storage/storage.service';
import { UtilService } from 'src/app/core/services/util/util.service';
import { AddLimitModalComponent } from '../add-limit-modal/add-limit-modal.component';

@Component({
  selector: 'app-dummy-daskboard',
  templateUrl: './dummy-daskboard.component.html',
  styleUrls: ['./dummy-daskboard.component.scss']
})
export class DummyDaskboardComponent implements OnInit {
  user: any;
  partnerDetail: any;
 message  : any;
 currentLimit:any;
 totalLimit:any;
 totalRequest:any;
 limitDetails: any;
 existingPiChart: any;
 revisedPiChart: any;
 sellIn: any;
 sellOut: any;
 wOS: any;
 billingTrends: any;
  constructor(public dialog: MatDialog, private limits: LimitlistService, private storage : StorageService, private util:UtilService) { }

  control = new FormControl();
  userApprover: string[] = ['Ashish Kumar', 'Bablu Kumar', 'Chandan Kumar', 'Deepak Kumar'];
  filtereduserApprover !: Observable<string[]>;
  @Input() partnerCode: string | undefined;
  ngOnChanges(){
    this.user = this.storage.getLocalObject('user');
    let data: any = {
      "KnoxID":this.user.KnoxID,
      "PartnerID":this.partnerCode //? this.partnerCode:"1387659"
    }
    let result : any =  this.limits.postLimitDeskboard(data).subscribe((res:any)=>{
  
    if(res.Response){
      this.partnerDetail = res.Response[0].partner;
      this.partnerDetail['timeago'] = this.timeSince(res.Response[0].partner.LastRequestRaised);
      this.currentLimit = res.Response[0].CurrentLimit;
      this.limitDetails = res.Response[0].LimitDetails;
      this.sellIn = JSON.stringify(res.Response[0].SellIn);
      this.sellOut = JSON.stringify(res.Response[0].SellOut);
      this.wOS = JSON.stringify(res.Response[0].WOS);
      this.billingTrends = JSON.stringify(res.Response[0].BillingTrends);
      
      let i = 0;
    let trl : any = 0;
    let drel : any = 0;
      for(let item of  this.limitDetails.RevisedPiChart){
        item['colorcode'] = this.util?.COLORS[i];
        item['DifferenceValue'] = ((item.LimitTotalValue )-(this.limitDetails.ExistingPiChart[i].LimitTotalValue ));
        item['DifferencePer'] = ((item.LimitTotalValue )-(this.limitDetails.ExistingPiChart[i].LimitTotalValue ));
        trl = trl + (item.LimitTotalValue);
        drel = drel + ((item.LimitTotalValue )-(this.limitDetails.ExistingPiChart[i].LimitTotalValue ));
        i++;
      }
      this.limitDetails['TotalofRLV'] = trl;
      this.limitDetails['Totadrel'] = drel;
      this.revisedPiChart = JSON.stringify(this.limitDetails.RevisedPiChart);
      this.existingPiChart = JSON.stringify(this.limitDetails.ExistingPiChart);
      this.totalLimit = 0;
      this.totalRequest = 0;
      for(let item of this.currentLimit){
        item['LastRevisionAgo'] = this.timeSince(item.LastRevision);
        this.totalLimit = this.totalLimit + (item.Limit ? item.Limit:0);
        this.totalRequest = this.totalRequest + (item.Requested ? item.Requested:0);
       
      }
      console.log('partner '+JSON.stringify( this.partnerDetail))
    }
    else{
      this.partnerDetail = undefined;
   
      this.message = res.Message;
    
    }
    
    });
  }
  getcolor(i: any){

  }
  ngOnInit() {
    this.filtereduserApprover = this.control.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)),
    );
 
   
 
  }

  private _filter(value: string): string[] {
    const filterValue = this._normalizeValue(value);
    return this.userApprover.filter(approverSugg => this._normalizeValue(approverSugg).includes(filterValue));
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }

  // ngOnInit(): void {
  // }
  openModel(){
    const dialogRef = this.dialog.open(AddLimitModalComponent, {
         
    //  data: {title: 'Error with records ', name: res.Response[0]},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //this.animal = result;
    });
  }

   intervals: any = [
    { label: 'year', seconds: 31536000 },
    { label: 'month', seconds: 2592000 },
    { label: 'day', seconds: 86400 },
    { label: 'hour', seconds: 3600 },
    { label: 'minute', seconds: 60 },
    { label: 'second', seconds: 1 }
  ];
  
   timeSince(data:any) {
   if(data){
    let date = new Date(data)

    const seconds : any = Math.floor((Date.now() - date.getTime()) / 1000);
    const interval: any = this.intervals.find((i:any )=> i.seconds < seconds);
    const count = Math.floor(seconds / interval.seconds);
    return `${count} ${interval.label}${count !== 1 ? 's' : ''} ago`;
   }else{
    return '';
   }
  }
}

