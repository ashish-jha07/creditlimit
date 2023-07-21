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
  selector: 'app-limit-dashboard',
  templateUrl: './limit-dashboard.component.html',
  styleUrls: ['./limit-dashboard.component.scss']
})
export class LimitDashboardComponent implements OnInit {
  user: any;
  approversList : any = [ {name : 'dhiraj.kumar', email : 'dhiraj.k3@samsung.com',IsNotifier : true}, {name : 'dhiraj.kumar', email : 'dhiraj.k3@samsung.com', IsNotifier : false}];
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
 revisedTotal: any;
 existingTotal: any;
 salesCapacityForecast: any;
 LimitUtilization: any;
 PartnerInvestmentPreviousYear: any;
 PartnerInvestmentCurrentYear: any;
 partnerInvestmentPreviousYear: any;
 partnerInvestmentCurrentYear: any;
 aRTrends: any;
 SCESEvaluation: any;
 limitReqData: any;
  constructor(public dialog: MatDialog, private limits: LimitlistService, private storage : StorageService, private util:UtilService) { }

  control = new FormControl();
  userApprover: string[] = ['Ashish Kumar', 'Bablu Kumar', 'Chandan Kumar', 'Deepak Kumar'];
  filtereduserApprover !: Observable<string[]>;
  @Input() partnerCode: string | undefined;
  ngOnChanges(){
    
    this.user = this.storage.getLocalObject('user');
    this.getpartnerData();
    this.getLimitData();
 

  }
 async getpartnerData(){
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
      this.LimitUtilization = JSON.stringify(res.Response[0].LimitUtilization);
      this.salesCapacityForecast = JSON.stringify(res.Response[0].SalesCapacityForecast);
      this.PartnerInvestmentPreviousYear = JSON.stringify(res.Response[0].PartnerInvestmentPreviousYear);
      this.PartnerInvestmentCurrentYear = JSON.stringify(res.Response[0].PartnerInvestmentCurrentYear);
      this.partnerInvestmentPreviousYear = res.Response[0].PartnerInvestmentPreviousYear;
      this.partnerInvestmentCurrentYear = res.Response[0].PartnerInvestmentCurrentYear;
      this.aRTrends = res.Response[0].ARTrends;
      this.SCESEvaluation = res.Response[0].SCESEvaluation;
      this.billingTrends = JSON.stringify(res.Response[0].BillingTrends);
      
      let i = 0;
    let trl : any = 0;
    let drel : any = 0;
    this.existingTotal = 0;
    for(let item of  this.limitDetails.ExistingPiChart){
    
      this.existingTotal = this.existingTotal + (item.LimitTotalValue);
     
    }
    this.revisedTotal = 0;
      for(let item of  this.limitDetails.RevisedPiChart){
       // item['LimitTotalValue'] =(item.LimitTotalValue) + 200000;
        item['colorcode'] = this.util?.COLORS[i];
        item['DifferenceValue'] = ((item.LimitTotalValue )-(this.limitDetails.ExistingPiChart[i].LimitTotalValue ));
        item['DifferencePer'] = ((item.LimitTotalValue )-(this.limitDetails.ExistingPiChart[i].LimitTotalValue ));
        trl = trl + (item.LimitTotalValue);
        this.revisedTotal = this.revisedTotal + (item.LimitTotalValue);
        drel = drel + ((item.LimitTotalValue )-(this.limitDetails.ExistingPiChart[i].LimitTotalValue ));
        i++;
      }
    
      this.existingTotal = this.numDifferentiation( this.existingTotal);
      this.revisedTotal = this.numDifferentiation( this.revisedTotal);
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
 async getLimitData() {
    let qdata: any = {
      "CustomerCode": this.partnerCode
    }
    let result : any =  this.limits.GetRequestLimitData(qdata).subscribe((res:any)=>{
    
      this.limitReqData = res?.Response;
      for(let item of this.limitReqData){
        item['ExistingLimit'] = Number(item.ExistingLimit);
        item['RequestedAmount'] = Number(item.RequestedAmount);
      }
    });
  }
  removeLimit(item: any){
    console.log(item);
    debugger
    let obj : any = {
       
    };
    let formData: any = new FormData();
   

     obj["CustomerCode"] = this.partnerCode;
     obj["AddUpdateDelete"] = 2;
   
     obj["AddLimitRequestCode"] = item.AddLimitRequestCode;


    
     formData.append("JsonData", JSON.stringify(obj));

 //     JsonData
 // console.log(formData)
 //     let objetdata : any  =  formData.getAll();
    // console.log(formData)
   this.limits.addUpdateDeleteLimit(formData).subscribe((res:any)=>{
    if(res.Response[0]){
      this.getLimitData();
    }
   })
  }
  getcolor(i: any){

  }
  isAbc(value:any){
return Math.abs(value);
  }
  numDifferentiation(value:any) {
    let val: any = Math.abs(value);
    if (val >= 10000000) {
      val = (val / 10000000).toFixed(2) + ' Cr';
    } else if (val >= 100000) {
      val = (val / 100000).toFixed(2) + ' Lac';
    }
    return val;
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
  editLimit(item: any){
debugger;
console.log(JSON.stringify(item))
  }
  openModel(){
    const dialogRef = this.dialog.open(AddLimitModalComponent, {
         
      data: {partnerCode: this.partnerDetail?.PartnerCode },
    });

    dialogRef.afterClosed().subscribe(result => {
     
     if(result){
     // this.getpartnerData();
      this.getLimitData();
     }
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

  submitAprover(){
   
const result = this.approversList.map((obj:any) => ({ApproverEmailID : obj.email,IsNotifier: obj.IsNotifier}));
    let payload = {
      Approvers: result,
      "SalesRemark": "test",
      "WOSRemark": "test",
      "BillingTrendRemark": "test",
      "PartnerInvestmentRemark": "test",
      "ForecastRemark": "test",
      "ARRemark": "test",
      "CustomerCode": this.partnerCode


    }
    this.limits.SubmitRequest(payload).subscribe((res:any)=>{
      console.log("res", res);

    })
  }

  addaproverlist(event :Event){
    // if(event.keyCode===13){
      //submit form
      this.approversList.push({name : this.control.value, email : this.control.value})
      console.log(this.approversList , "test", this.control.value);
    // }

    
  }
extractValue(arr:any, prop:any) {

    // extract value from property
    let extractedValue = arr.map((item:any) => item[prop]);

    return extractedValue;

}
}
