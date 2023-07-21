import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AbstractControl, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { LimitlistService } from '../../services/limitlist.service';
import { StorageService } from 'src/app/core/services/storage/storage.service';
import { UtilService } from 'src/app/core/services/util/util.service';
import { AddLimitModalComponent } from '../add-limit-modal/add-limit-modal.component';
import { ThisReceiver } from '@angular/compiler';
import { CommanDialogComponent } from 'src/app/modules/shared/components/comman-dialog/comman-dialog.component';
import { ConfirmdialogComponent } from 'src/app/modules/shared/components/confirmdialog/confirmdialog.component';
import { CommonResponseDialogComponent } from 'src/app/modules/shared/components/common-response-dialog/common-response-dialog.component';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Router } from '@angular/router';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
@Component({
  selector: 'app-limit-deshboard-new',
  templateUrl: './limit-deshboard-new.component.html',
  styleUrls: ['./limit-deshboard-new.component.scss'],
  providers: [Location, {provide: LocationStrategy, useClass: PathLocationStrategy}]
})
export class LimitDeshboardNewComponent implements OnInit {
  SalesRemark: string = '';
  WOSRemark: string = '';
  updatechart: any = false;
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
    attachments: [''],
    // wosRemark: ['', Validators.required],
    // salesRemark: ['', Validators.required],
    // salesRemark: ['', Validators.required],
  });
  qdata: any = [];
  submitted: any = false;
  empByUid: any;
  constructor(public dialog: MatDialog, private router : Router,private location: Location, private el: ElementRef, public fb: FormBuilder, private limits: LimitlistService, private storage: StorageService, private util: UtilService) { }

  control = new FormControl();
  userApprover: string[] = ['Ashish Kumar', 'Bablu Kumar', 'Chandan Kumar', 'Deepak Kumar'];
  filtereduserApprover !: Observable<string[]>;
  @Input() partnerCode: string | undefined;
  @Input() approvalData: string | undefined;
  approvalD: any;
  ngOnChanges() {

    this.user = this.storage.getLocalObject('user');
    this.getpartnerData();
    this.getLimitData();
    this.updatechart = !this.updatechart;
    if(this.approvalData){
      this.approvalD =  JSON.parse(this.approvalData);
   
    }

  }
  get f(): { [key: string]: AbstractControl } {
    return this.submitFormdata.controls;
  }
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
  ngAfterViewInit() {
    this.qdata = [];
    this.downloadpdf2();
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
  async getA(event: any) {
    let qdata: any = {
      "CustomerCode": event.target.value
    }
     this.limits.GetApprovalList(qdata).subscribe((res: any) => {

      if(res?.Response){
        this.empByUid = res?.Response[0].employees;
      }
     debugger
    
    });
  }
  convertInlakha(value : any){
    let val: any = Math.abs(value);
 
    return  val = (val / 100000).toFixed(2) ;
  }
  //RaiseRequest/EmpSearchByUid
  removeLimit(item: any) {
    const dialogRef = this.dialog.open(ConfirmdialogComponent, {

      data: { partnerCode: this.partnerDetail?.PartnerCode },
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result) {

        let obj: any = {

        };
        let formData: any = new FormData();


        obj["CustomerCode"] = this.partnerCode;
        obj["AddUpdateDelete"] = 2;

        obj["AddLimitRequestCode"] = item.AddLimitRequestCode;



        formData.append("JsonData", JSON.stringify(obj));


        this.limits.addUpdateDeleteLimit(formData).subscribe((res: any) => {
          if (res.Response[0]) {
            this.getpartnerData();
            this.getLimitData();
            this.updatechart = !this.updatechart;



            const dialogRef = this.dialog.open(CommonResponseDialogComponent, {
              data: { title: 'Response', name: res.Message },
            });
          }
        })
      }
      //this.animal = result;
    });
    console.log(item);


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

    // console.log(JSON.stringify(item))
    // this.editModel(item)
    // this.openModel()
  }
  openModel() {
    // alert()
    const dialogRef = this.dialog.open(AddLimitModalComponent, {

      data: { partnerCode: this.partnerDetail?.PartnerCode },
      panelClass: 'custom-modalbox'
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log(result , "test ashish");

      if (result) {
        this.getpartnerData();
        this.getLimitData();
        this.updatechart = !this.updatechart;

        const dialogRef = this.dialog.open(CommonResponseDialogComponent, {
          data: { title: 'Response', name: result.Message },
        });
      }
      //this.animal = result;
    });
  }
  cancelModel1(data: any) {
    console.log(data , "edit data");
    // data['IsEditEnable'] = this.approvalD?.IsEditEnable;
    // data['IsApprover'] = this.approvalD?.IsApprover;
    data['isedit'] = true;
    data['isCancel'] = true;
    data['partnerCode'] = this.partnerDetail?.PartnerCode
    const dialogRef = this.dialog.open(AddLimitModalComponent, {
      // { partnerCode: this.partnerDetail?.PartnerCode }
      // console.log(data);

      data: data,
      // data: data['partnerCode'] =this.partnerDetail?.PartnerCode,
      panelClass: 'custom-modalbox'

    });
    console.log(data, "editdata limitdashbaord");

    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        this.getpartnerData();
        this.getLimitData();
        this.updatechart = !this.updatechart;
        const dialogRef = this.dialog.open(CommonResponseDialogComponent, {
          data: { title: 'Response', name: result.Message },
        });
      }
      //this.animal = result;
    });
  }

  editModel(data: any) {
    console.log(data , "edit data");
    data['IsEditEnable'] = this.approvalD?.IsEditEnable;
    data['IsApprover'] = this.approvalD?.IsApprover;
    data['isedit'] = true;
    data['partnerCode'] = this.partnerDetail?.PartnerCode
    const dialogRef = this.dialog.open(AddLimitModalComponent, {
      // { partnerCode: this.partnerDetail?.PartnerCode }
      // console.log(data);

      data: data,
      // data: data['partnerCode'] =this.partnerDetail?.PartnerCode,
      panelClass: 'custom-modalbox'

    });
    console.log(data, "editdata limitdashbaord");

    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        this.getpartnerData();
        this.getLimitData();
        this.updatechart = !this.updatechart;
        const dialogRef = this.dialog.open(CommonResponseDialogComponent, {
          data: { title: 'Response', name: result.Message },
        });
      }
      //this.animal = result;
    });
  }
  editModel1(data: any) {
    console.log(data, "edit datamodal 1");
    
    data['isedit'] = true;
    data['iseditCurrent'] = true;
    data['partnerCode'] = this.partnerDetail?.PartnerCode
    const dialogRef = this.dialog.open(AddLimitModalComponent, {
      // { partnerCode: this.partnerDetail?.PartnerCode }
      // console.log(data);

      data: data,
      // data: data['partnerCode'] =this.partnerDetail?.PartnerCode,
      panelClass: 'custom-modalbox'

    });
    console.log(data, "editdata limitdashbaord");

    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        this.getpartnerData();
        this.getLimitData();
        this.updatechart = !this.updatechart;
        const dialogRef = this.dialog.open(CommonResponseDialogComponent, {
          data: { title: 'Response', name: result.Message },
        });
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
      let date: any = new Date(data)
      const seconds: any = Math.floor((Date.now() - date.getTime()) / 1000);
      const interval: any = this.intervals.find((i: any) => i.seconds < seconds);
      const count = Math.floor(seconds / interval.seconds);
      return `${count} ${interval.label}${count !== 1 ? 's' : ''} ago`;
    } else {
      return '';
    }
  }


  upload(event: any) {

    if (event.target.files.length > 0) {
      this.submitFormdata.patchValue({
        attachments: event.target.files[0],
      })
    }
    //this.submitFormdata.controls['Img'].updateValueAndValidity()
  }
  addimgbase64() {
    //  this.downloadpdf2();
    let that = this;
    const myTimeout = setTimeout(this.downloadpdf2, 500);
  }
  downloadpdf2() {
    let that = this;
    console.log("enter it sunil")
   
    let Component: any = that.el.nativeElement.querySelector(`#pdfTable`);
  
    console.log("enter it sunil")
    html2canvas(that.el.nativeElement.querySelector(`#pdfTable`)).then((canvas: any) => {
      console.log("execute 1 it sunil")
      const base64Canvas = canvas.toDataURL().split(';base64,')[1]

      that.qdata.push(base64Canvas);
      console.log("execute it sunil")
      //     let result: any = that.limits.test(qdata).subscribe((res: any) => {
      // debugger
      //    let data = res?.Response;

      //     });
    });

  }
  submitAprover() {
    this.submitted = true;
    if (this.submitFormdata.invalid) {
      for (const key of Object.keys(this.submitFormdata.controls)) {
        if (this.submitFormdata.controls[key].invalid) {
          const invalidControl = this.el.nativeElement.querySelector('[formcontrolname="' + key + '"]');
          invalidControl.focus();
          break;
        }
      }
      return;
    } else {
      let ApproverData: any = [];
      let i: any = 0;
      let currentuser: any = {
        "ApproverKnoxID":this.user?.KnoxID,
        "ApproverName":this.user?.FullName,
        "EmailAddress": this.user.Email,
        "apRlCd": "0",
        "seq": i.toString()
      }
      i++;
      ApproverData.push(currentuser);
      for (let item of this.approversList) {
       
        let data: any = {
          "ApproverKnoxID":item?.KnoxId,
          "ApproverName":item?.Name,
          "EmailAddress": item.Email,
          "apRlCd": (item?.IsNotifier ? "9" : "1"),
          "seq": i.toString()
        };
        ApproverData.push(data);
        i++;
      }


      // alert(payload)

      let obj: any = {
        "Images": this.qdata,
        "approvers": ApproverData,
        "SalesRemark": this.submitFormdata.controls['salesRemark'].value,
        "WOSRemark": this.submitFormdata.controls['wosRemark'].value,
        "BillingTrendRemark": this.submitFormdata.controls['billingTrendRemark'].value,
        "PartnerInvestmentRemark": this.submitFormdata.controls['partnerInvestmentRemark'].value,
        "ForecastRemark": this.submitFormdata.controls['forecastRemark'].value,
        "ARRemark": this.submitFormdata.controls['arRemark'].value,

        "CustomerCode": this.partnerCode,

      };
      var formData: any = new FormData();
      formData.append("Attachments", this.submitFormdata.controls['attachments'].value);
      // obj["LimitType"] = this.submitFormdata.controls['limitType'].value.toString();


      console.log(JSON.stringify(obj));
      formData.append("JsonData", JSON.stringify(obj));

   
      this.limits.addSubmitApproval(formData).subscribe((res: any) => {
        if(res?.IsSucsess && res?.Message == "Success" && res?.StatusCode ==1){
        const dialogRef = this.dialog.open(CommanDialogComponent, {
          data: { name: "Your request has been submitted successfully."},
        });
    let that = this;
        dialogRef.afterClosed().subscribe(result => {
          that.location.back();
       
        });
      }
      })
      
      // this.limits.SubmitRequest(payload).subscribe((res: any) => {

      //   console.log("res", res);

      // })
    }


  }

  addaproverlist(item: any) {
let finditem =  this.approversList.find((res: any)=>{
  return res.Name == item.enFullName;
})
if(!finditem){
  this.approversList.unshift({ Name: item.enFullName, Email: item.emailAddress, IsNotifier: false, isExist: true })
  console.log(this.approversList, "test", this.control.value);

  //this.approversList.sort((a: any, b: any) => a.Name.localeCompare(b.Name))
  //this.control.value = '';
}


  }
  removeItem(index: any) {
    this.approversList.splice(index, 1);
  }
  extractValue(arr: any, prop: any) {

    // extract value from property
    let extractedValue = arr.map((item: any) => item[prop]);

    return extractedValue;

  }
  partnerInvestment(controlName: any) {

    if (controlName) {
      this.submitFormdata.controls[controlName].setValidators([Validators.required])
      this.submitFormdata.controls[controlName].updateValueAndValidity()

    }

  }
  chnageToggle(item: any) {
 
    if(!item.IsDefault){
      console.log(item)
      item.IsNotifier = !item.IsNotifier;
      ApproverID: 1
    }

    // Email: "dhiraj.k3@samsung.com"
    // IsNotifier: false
    // KnoxId: "dhiraj.k3"
    // Name: "Dhiraj Kumar

  }
}
