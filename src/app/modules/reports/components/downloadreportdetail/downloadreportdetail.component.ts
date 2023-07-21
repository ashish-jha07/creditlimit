import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AbstractControl, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
//import { LimitlistService } from '../../services/limitlist.service';
import { StorageService } from 'src/app/core/services/storage/storage.service';
import { UtilService } from 'src/app/core/services/util/util.service';
import { LimitlistService } from 'src/app/modules/limit-list/services/limitlist.service';
import { AddLimitModalComponent } from 'src/app/modules/limit-list/components/add-limit-modal/add-limit-modal.component';
//import { AddLimitModalComponent } from '../add-limit-modal/add-limit-modal.component';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { LoaderService } from 'src/app/core/services/ui/loader.service';
// declare var require: any;
// // import * as pdfMake from "pdfmake/build/pdfmake";
// // import * as pdfFonts from "pdfmake/build/vfs_fonts";
// const htmlToPdfmake = require("html-to-pdfmake");

@Component({
  selector: 'app-downloadreportdetail',
  templateUrl: './downloadreportdetail.component.html',
  styleUrls: ['./downloadreportdetail.component.scss']
})
export class DownloadreportdetailComponent implements OnInit {
  @ViewChild('pdfTable')
  pdfTable!: ElementRef;
  SalesRemark: string = '';
  WOSRemark: string = '';
  BillingTrendRemark: string = '';
  PartnerInvestmentRemark: string = '';
  ForecastRemark: string = '';
  ARRemark: string = '';
  user: any;
  partnerDetail: any;
  message: any;
  currentLimit: any;
  totalLimit: any;
  totalRequest: any;
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
  approversList: any = [];
  submitFormdata = this.fb.group({
    salesRemark: [''],
    wosRemark: [''],
    billingTrendRemark: [''],
    partnerInvestmentRemark: [''],
    forecastRemark: [''],
    arRemark: [''],
    creditLimitRemark: [''],
    // wosRemark: ['', Validators.required],
    // salesRemark: ['', Validators.required],
    // salesRemark: ['', Validators.required],
  });
  submitted : any = false;
  constructor(public dialog: MatDialog, public fb: FormBuilder, private elementRef: ElementRef, private limits: LimitlistService, private storage: StorageService, private util: UtilService,  private loader : LoaderService) { }

  control = new FormControl();
  userApprover: string[] = ['Ashish Kumar', 'Bablu Kumar', 'Chandan Kumar', 'Deepak Kumar'];
  filtereduserApprover !: Observable<string[]>;
  @Input() partnerCode: string | undefined;

  downloadpdf1(){
    let quotes = this.elementRef.nativeElement.querySelector(`#pdfTable`);

    html2canvas(quotes).then((canvas) => {

        //! MAKE YOUR PDF
        var pdf = new jsPDF('p', 'pt', 'letter');

        for (var i = 0; i <= quotes.clientHeight/1200; i++) {
            //! This is all just html2canvas stuff
            var srcImg  = canvas;
            var sX      = 0;
            var sY      = 1200*i; // start 980 pixels down for every new page
            var sWidth  = 1200;
            var sHeight = 1200;
            var dX      = 0;
            var dY      = 0;
            var dWidth  = 1200;
            var dHeight = 1200;

            (<any>window).onePageCanvas = document.createElement("canvas");
            (<any>window).onePageCanvas.setAttribute('width', 1200);
            (<any>window).onePageCanvas.setAttribute('height', 1200);
            var ctx = (<any>window).onePageCanvas.getContext('2d');
            // details on this usage of this function: 
            // https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Using_images#Slicing
            ctx.drawImage(srcImg,sX,sY,sWidth,sHeight,dX,dY,dWidth,dHeight);

            // document.body.appendChild(canvas);
            var canvasDataURL = (<any>window).onePageCanvas.toDataURL("image/png", 1.0);

            var width         = (<any>window).onePageCanvas.width;
            var height        = (<any>window).onePageCanvas.clientHeight;

            //! If we're on anything other than the first page,
            // add another page
            if (i > 0) {
                pdf.addPage([612, 791]); //8.5" x 11" in pts (in*72)
            }
            //! now we declare that we're working on that page
            pdf.setPage(i+1);
            //! now we add content to that page!
            pdf.addImage(canvasDataURL, 'PNG', 20, 40, (width*.62), (height*.62));

        }
        //! after the for loop is finished running, we save the pdf.
        pdf.save('test.pdf');
    }
  );
  }
  downloadpdf2(){
    let that = this;
    let Component = this.elementRef.nativeElement.querySelector(`#pdfTable`);
    html2canvas(Component).then((canvas) => {
      const base64Canvas = canvas.toDataURL().split(';base64,')[1]
      let qdata: any = []
      qdata.push(base64Canvas);
      let result: any = that.limits.test(qdata).subscribe((res: any) => {
  debugger
     let data = res?.Response;
      
      });
    });
  
  }
  downloadpdf(){
    this.loader.show();
    let that = this;
    let Component = this.elementRef.nativeElement.querySelector(`#pdfTable`);

    html2canvas(Component).then((canvas) => {
      const componentWidth = Component.offsetWidth
    const componentHeight = Component.offsetHeight

    const orientation = componentWidth >= componentHeight ? 'l' : 'p'

    const imgData = canvas.toDataURL('image/png')
    let pdf = new jsPDF({
    orientation,
    unit: 'px'
  })

    pdf.internal.pageSize.width = componentWidth
    pdf.internal.pageSize.height = componentHeight

    pdf.addImage(imgData, 'PNG', 0, 0, componentWidth, componentHeight)
    let name = "CustomerPerformanceReport_"+this.partnerCode + ".pdf";
    pdf.save(name);
      that.loader.hide();
    });
  }
  ngOnChanges() {

    this.user = this.storage.getLocalObject('user');
    this.getpartnerData();
    this.getLimitData();


  }
  // editModel1(data: any) {
    
  //   data['isedit'] = true;
  //   data['iseditCurrent'] = true;
  //   data['partnerCode'] = this.partnerDetail?.PartnerCode
  //   const dialogRef = this.dialog.open(AddLimitModalComponent, {
  //     // { partnerCode: this.partnerDetail?.PartnerCode }
  //     // console.log(data);

  //     data: data,
  //     // data: data['partnerCode'] =this.partnerDetail?.PartnerCode,
  //     panelClass: 'custom-modalbox'

  //   });
  //   console.log(data, "editdata limitdashbaord");

  //   dialogRef.afterClosed().subscribe(result => {

  //     if (result) {
  //       this.getpartnerData();
  //       this.getLimitData();
  //       this.updatechart = !this.updatechart;
  //       const dialogRef = this.dialog.open(CommonResponseDialogComponent, {
  //         data: { title: 'Response', name: result.Message },
  //       });
  //     }
  //     //this.animal = result;
  //   });
  // }
  convertInlakha(value : any){
    let val: any = Math.abs(value);
 
    return  val = (val / 100000).toFixed(2) ;
  }
  get f(): { [key: string]: AbstractControl } {
    return this.submitFormdata.controls;
  }
  // async getpartnerData() {
  //   let data: any = {
  //     "KnoxID": this.user.KnoxID,
  //     "PartnerID": this.partnerCode //? this.partnerCode:"1387659"
  //   }
  //   let result: any = this.limits.postLimitDeskboard(data).subscribe((res: any) => {

  //     if (res.Response) {
  //       this.partnerDetail = res.Response[0].partner;
  //       this.partnerDetail['timeago'] = this.timeSince(res.Response[0].partner.LastRequestRaised);
  //       this.currentLimit = res.Response[0].CurrentLimit;
  //       this.limitDetails = res.Response[0].LimitDetails;
  //       this.sellIn = JSON.stringify(res.Response[0].SellIn);
  //       this.sellOut = JSON.stringify(res.Response[0].SellOut);
  //       this.wOS = JSON.stringify(res.Response[0].WOS);
  //       for(let item of  res.Response[0].WOS){
  //         if(item.IsThresholdBreach){

  //           this.partnerInvestment('wosRemark');
  //          }
  //       }
  //       this.LimitUtilization = JSON.stringify(res.Response[0].LimitUtilization);
  //       this.salesCapacityForecast = JSON.stringify(res.Response[0].SalesCapacityForecast);
  //       this.PartnerInvestmentPreviousYear = JSON.stringify(res.Response[0].PartnerInvestmentPreviousYear);
  //       this.PartnerInvestmentCurrentYear = JSON.stringify(res.Response[0].PartnerInvestmentCurrentYear);
  //       this.partnerInvestmentPreviousYear = res.Response[0].PartnerInvestmentPreviousYear;
  //       this.partnerInvestmentCurrentYear = res.Response[0].PartnerInvestmentCurrentYear;
  //       for(let item of  this.partnerInvestmentCurrentYear.monthData){
  //         if(item.IsThresholdBreach){

  //           this.partnerInvestment('partnerInvestmentRemark');
  //          }
  //       }
  //       for(let item of res.Response[0].Approver){
  //         item['IsNotifier'] = false;
  //         item['isExist'] = false;
  //         this.approversList.push(item);
  //       }
       
  //       this.aRTrends = res.Response[0].ARTrends;
  //       this.SCESEvaluation = res.Response[0].SCESEvaluation;
  //       this.billingTrends = JSON.stringify(res.Response[0].BillingTrends);
  //       for(let item of res.Response[0].BillingTrends){
  //         if(item.IsThresholdBreach){

  //           this.partnerInvestment('billingTrendRemark');
  //          }
  //       }
  //       let i = 0;
  //       let trl: any = 0;
  //       let drel: any = 0;
  //       this.existingTotal = 0;
  //       for (let item of this.limitDetails?.ExistingPiChart) {

  //         this.existingTotal = this.existingTotal + (item?.LimitTotalValue);

  //       }
       
  //       this.revisedTotal = 0;
  //       let existItems :any = [];
  //       for (let item of this.limitDetails?.RevisedPiChart) {
  //        // item['LimitTotalValue'] = (item.LimitTotalValue) + 200000;
  //         item['colorcode'] = this.util?.COLORS[i];
  //         item['DifferenceValue'] = ((item?.LimitTotalValue) - (this.limitDetails?.ExistingPiChart.find((element:any) => element?.LimitDescription ==  item?.LimitDescription).LimitTotalValue??0));
  //         item['DifferencePer'] = ((item?.LimitTotalValue) - (this.limitDetails?.ExistingPiChart.find((element:any) => element?.LimitDescription ==  item?.LimitDescription).LimitTotalValue??0));
  //         trl = trl + (item?.LimitTotalValue);
  //         if((item?.LimitTotalValue - (this.limitDetails?.ExistingPiChart.find((element:any) => element.LimitDescription ==  item?.LimitDescription).LimitTotalValue??0)) == item?.LimitTotalValue){
  //           item['Percent'] = 100;  
  //         }else{
  //           let dv =(item?.LimitTotalValue - (this.limitDetails?.ExistingPiChart.find((element:any) => element.LimitDescription ==  item?.LimitDescription).LimitTotalValue??0));
  //           item['Percent'] = (dv/(this.limitDetails?.ExistingPiChart.find((element:any) => element.LimitDescription ==  item?.LimitDescription).LimitTotalValue??0)*100).toFixed(2)
  //         }
       
  //         if(this.limitDetails?.ExistingPiChart.find((element:any) => element.LimitDescription ==  item?.LimitDescription).LimitTotalValue){
  //           existItems.push(this.limitDetails?.ExistingPiChart.find((element:any) => element.LimitDescription ==  item?.LimitDescription)) 
  //         }else{
  //           let notitem :any;
  //           notitem["LimitDescription"]=  item?.LimitDescription;
  //           notitem["LimitTotalValue"]=  0;
  //           existItems.push(notitem);
  //         }
       
  //         this.revisedTotal = this.revisedTotal + (item?.LimitTotalValue);
  //         drel = drel + ((item?.LimitTotalValue) - (this.limitDetails?.ExistingPiChart.find((element:any) => element.LimitDescription ==  item?.LimitDescription).LimitTotalValue??0));
  //         i++;
  //       }

  //       this.existingTotal = this.numDifferentiation(this.existingTotal);
  //       this.revisedTotal = this.numDifferentiation(this.revisedTotal);
  //       this.limitDetails['TotalofRLV'] = trl;
  //       this.limitDetails['Totadrel'] = drel;
  //       this.revisedPiChart = JSON.stringify(this.limitDetails?.RevisedPiChart);
  //       this.existingPiChart = JSON.stringify(existItems);
  //       this.totalLimit = 0;
  //       this.totalRequest = 0;
  //       for (let item of this.currentLimit) {
  //         item['LastRevisionAgo'] = this.timeSince(item.LastRevision);
  //         this.totalLimit = this.totalLimit + (item.Limit ? item.Limit : 0);
  //         this.totalRequest = this.totalRequest + (item.Requested ? item.Requested : 0);

  //       }
  //       console.log('partner ' + JSON.stringify(this.partnerDetail))
  //     }
  //     else {
  //       this.partnerDetail = undefined;

  //       this.message = res.Message;

  //     }

  //   });
  // }
  async getpartnerData() {
    let data: any = {
      "KnoxID": this.user.KnoxID,
      "PartnerID": this.partnerCode //? this.partnerCode:"1387659"
    }
    let result: any = this.limits.postLimitDeskboard(data).subscribe((res: any) => {

      if (res.Response) {

        this.partnerDetail = res.Response[0].partner;
        this.partnerDetail['timeago'] = this.timeSince(res.Response[0].partner.LastRequestRaised);
        this.currentLimit = res.Response[0].CurrentLimit;
        this.limitDetails = res.Response[0].LimitDetails;
        this.sellIn = JSON.stringify(res.Response[0].SellIn);
        this.sellOut = JSON.stringify(res.Response[0].SellOut);
        this.wOS = JSON.stringify(res.Response[0].WOS);
        for (let item of res.Response[0].WOS) {
          if (item.IsThresholdBreach) {

            this.partnerInvestment('wosRemark');
          }
        }
        this.LimitUtilization = JSON.stringify(res.Response[0].LimitUtilization);
        this.salesCapacityForecast = JSON.stringify(res.Response[0].SalesCapacityForecast);
        this.PartnerInvestmentPreviousYear = JSON.stringify(res.Response[0].PartnerInvestmentPreviousYear);
        this.PartnerInvestmentCurrentYear = JSON.stringify(res.Response[0].PartnerInvestmentCurrentYear);
        this.partnerInvestmentPreviousYear = res.Response[0].PartnerInvestmentPreviousYear;
        this.partnerInvestmentCurrentYear = res.Response[0].PartnerInvestmentCurrentYear;
        for (let item of this.partnerInvestmentCurrentYear.monthData) {
          if (item.IsThresholdBreach) {

            this.partnerInvestment('partnerInvestmentRemark');
          }
        }
        this.approversList = [];
        for (let item of res.Response[0].Approver) {
          item['IsNotifier'] = false;
          item['IsDefault'] = true;
          item['isExist'] = false;
          this.approversList.push(item);
        }

        this.aRTrends = res.Response[0].ARTrends;
        for (let item of  this.aRTrends) {
         item['TotalinLakha'] = this.convertInlakha(item?.TOTAL);
        }
        this.SCESEvaluation = res.Response[0].SCESEvaluation;
        this.billingTrends = JSON.stringify(res.Response[0].BillingTrends);
        for (let item of res.Response[0].BillingTrends) {
          if (item.IsThresholdBreach) {

            this.partnerInvestment('billingTrendRemark');
          }
        }
        let i = 0;
        let trl: any = 0;
        let drel: any = 0;
        this.existingTotal = 0;
        for (let item of this.limitDetails?.ExistingPiChart) {

          this.existingTotal = this.existingTotal + (item?.LimitTotalValue);

        }

        this.revisedTotal = 0;
        let existItems: any = [];
        for (let item of this.limitDetails?.RevisedPiChart) {
          // item['LimitTotalValue'] = (item.LimitTotalValue) + 200000;
          item['colorcode'] = this.util?.COLORS[i];
          let itemD = this.limitDetails?.ExistingPiChart.find((element: any) => element?.LimitDescription == item?.LimitDescription)
          if (itemD) {

            item['DifferenceValue'] = (item?.LimitTotalValue - itemD.LimitTotalValue);
            item['DifferencePer'] = (item?.LimitTotalValue - itemD.LimitTotalValue);
            item['Percent'] = ((item?.DifferencePer / itemD.LimitTotalValue) * 100).toFixed(2)
            drel = drel + ((item?.LimitTotalValue) - itemD.LimitTotalValue);
            existItems.push(itemD)
          } else {

            item['DifferenceValue'] = (item?.LimitTotalValue);
            item['Percent'] = 100;
            let notitem: any = {};
            notitem["LimitDescription"] = item?.LimitDescription;
            notitem["LimitTotalValue"] = 0;
            drel = drel + ((item?.LimitTotalValue) - 0);
            existItems.push(notitem);
          }

          trl = trl + (item?.LimitTotalValue);




          this.revisedTotal = this.revisedTotal + (item?.LimitTotalValue);

          i++;
        }

        this.existingTotal = this.numDifferentiation(this.existingTotal);
        this.revisedTotal = this.numDifferentiation(this.revisedTotal);
        this.limitDetails['TotalofRLV'] = trl;
        this.limitDetails['Totadrel'] = drel;
        this.revisedPiChart = JSON.stringify(this.limitDetails?.RevisedPiChart);
        this.existingPiChart = JSON.stringify(existItems);
        this.totalLimit = 0;
        this.totalRequest = 0;
        for (let item of this.currentLimit) {
          item['LastRevisionAgo'] = this.timeSince(item.LastRevision);
          this.totalLimit = this.totalLimit + (item.TotalLimit ? item.TotalLimit : 0);
          this.totalRequest = this.totalRequest + (item.Requested ? item.Requested : 0);

        }
        console.log('partner ' + JSON.stringify(this.partnerDetail))

      }
      else {
        this.partnerDetail = undefined;

        this.message = res.Message;

      }

    });
  }
  async getLimitData() {
    let qdata: any = {
      "CustomerCode": this.partnerCode
    }
    let result: any = this.limits.GetRequestLimitData(qdata).subscribe((res: any) => {

      this.limitReqData = res?.Response;
      for (let item of this.limitReqData) {
        item['ExistingLimit'] = Number(item.ExistingLimit);
        item['RequestedAmount'] = Number(item.RequestedAmount);
      }
    });
  }
  removeLimit(item: any) {
    console.log(item);
    debugger
    let obj: any = {

    };
    let formData: any = new FormData();


    obj["CustomerCode"] = this.partnerCode;
    obj["AddUpdateDelete"] = 2;

    obj["AddLimitRequestCode"] = item.AddLimitRequestCode;



    formData.append("JsonData", JSON.stringify(obj));

    
    this.limits.addUpdateDeleteLimit(formData).subscribe((res: any) => {
      if (res.Response[0]) {
        this.getLimitData();
      }
    })
  }
  getcolor(i: any) {

  }
  isAbc(value: any) {
    return Math.abs(value);
  }
  numDifferentiation(value: any) {
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


  editLimit(item: any) {
   
    console.log(JSON.stringify(item))
  }
  openModel() {
    const dialogRef = this.dialog.open(AddLimitModalComponent, {

      data: { partnerCode: this.partnerDetail?.PartnerCode },
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result) {
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

  timeSince(data: any) {
    if (data) {
      let date = new Date(data)

      const seconds: any = Math.floor((Date.now() - date.getTime()) / 1000);
      const interval: any = this.intervals.find((i: any) => i.seconds < seconds);
      const count = Math.floor(seconds / interval.seconds);
      return `${count} ${interval.label}${count !== 1 ? 's' : ''} ago`;
    } else {
      return '';
    }
  }




  submitAprover() {
    this.submitted = true;
if(this.submitFormdata.invalid){
 return ;
}else {
  
  const result = this.approversList.map((obj: any) => ({ ApproverEmailID: obj.Email, IsNotifier: obj.IsNotifier }));
  let payload = {
   
    Approvers: result,
    "SalesRemark":this.submitFormdata.controls['salesRemark'].value,
    "WOSRemark": this.submitFormdata.controls['wosRemark'].value,
    "BillingTrendRemark": this.submitFormdata.controls['billingTrendRemark'].value,
    "PartnerInvestmentRemark": this.submitFormdata.controls['partnerInvestmentRemark'].value,
    "ForecastRemark": this.submitFormdata.controls['forecastRemark'].value,
    "ARRemark": this.submitFormdata.controls['arRemark'].value,
    "CustomerCode": this.partnerCode
  }

  // alert(payload)
  console.log(payload, " pyaload");

  this.limits.SubmitRequest(payload).subscribe((res: any) => {
    console.log("res", res);

  })
}


  }

  addaproverlist() {

    this.approversList.push({ Name: this.control.value, Email: this.control.value ,IsNotifier:true })
    console.log(this.approversList, "test", this.control.value);

  }
  extractValue(arr: any, prop: any) {

    // extract value from property
    let extractedValue = arr.map((item: any) => item[prop]);

    return extractedValue;

  }
  partnerInvestment(controlName: any){
  
    if(controlName){
      this.submitFormdata.controls[controlName].setValidators([Validators.required])
      this.submitFormdata.controls[controlName].updateValueAndValidity()
     
    }

  }
  chnageToggle(item: any){
    debugger
    console.log(item)
    item.IsNotifier = ! item.IsNotifier;
    ApproverID: 1
// Email: "dhiraj.k3@samsung.com"
// IsNotifier: false
// KnoxId: "dhiraj.k3"
// Name: "Dhiraj Kumar

  }

}
