import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LimitlistService } from '../../services/limitlist.service';
import * as fs from 'file-saver';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';
import { SplitPipe } from 'src/app/core/pipes/namefilter.pipe';
import { LoaderService } from 'src/app/core/services/ui/loader.service';

@Component({
  selector: 'app-add-limit-modal',
  templateUrl: './add-limit-modal.component.html',
  styleUrls: ['./add-limit-modal.component.scss'],
  providers:[SplitPipe]
})
export class AddLimitModalComponent implements OnInit {
  fileName : any;
  submita: any;
  totalAmount: any = 0;
  limitType: any;
  cFlimitType: any;
  reqA: any;
  isError: any = false ;
  isReadOnly = true
  partenerCFAmounts: any;
  HedgeValidTomaxDate : any;
  HedgeValidTominDate : any;
  CreditLimitTomixDate : any;
  CreditLimitTomaxDate :any
  addLimitForm: FormGroup = this.fb.group({
    limitType: ['', Validators.required],
    CFLimitType: [''],
    BankName: ['', Validators.required],
    AccountNumber: ['', Validators.required],
    TotalLimit: ['', Validators.compose([Validators.required ,Validators.maxLength(15)])],
    HedgeValidFrom: ['', Validators.required],
    HedgeValidTo: ['', Validators.required],
    CreditLimitFrom: ['', Validators.required],
    CreditLimitTo: ['', Validators.required],
    RequestedAmount: ['', Validators.compose([Validators.required ,Validators.maxLength(15)])],
    ApprovedRequestedAmount: [''],
    ExpiredLimitTo: [''],
    usedAmount: [''],
    Remarks: [''],
    Img: [''],//, Validators.required

  },

  { validators: [this.checkAmount,this.checkDates] }
  // { validator: this.checkDates   }

  );

  get Remarks() {
    return this.addLimitForm.get('Remarks');
 }
    constructor(private loader : LoaderService, private splitpipe :SplitPipe ,private sanitizer: DomSanitizer,private limitlistService: LimitlistService, public dialogRef: MatDialogRef<AddLimitModalComponent>, private fb: FormBuilder, @Optional() @Inject(MAT_DIALOG_DATA) public data: any, @Optional() @Inject(MAT_DIALOG_DATA) public editdata: any) {
    console.log(data, "editdata");

  }
  //  this method used data validation
  checkDates1(group: FormGroup) {
    // alert()
    if (group['controls']['CreditLimitFrom'].value > group['controls']['CreditLimitTo'].value) {
    
      return { notValidDate1: true }
    }
    return null;
  }
checkDates(group: FormGroup) {
  // alert()
  if (group['controls']['HedgeValidFrom'].value > group['controls']['HedgeValidTo'].value) {
  
    return { notValidDate: true }
  }
  return null;
}


  ngOnInit(): void {
    // this.addLimitForm = this.fb.group({
    //   limitType: ['', Validators.required],
    //   CFLimitType: [''],
    //   BankName: ['', Validators.required],
    //   AccountNumber: ['', Validators.required],
    //   TotalLimit: ['', Validators.compose([Validators.required ,Validators.maxLength(15)])],
    //   HedgeValidFrom: ['', Validators.required],
    //   HedgeValidTo: ['', Validators.required],
    //   CreditLimitFrom: ['', Validators.required],
    //   CreditLimitTo: ['', Validators.required],
    //   RequestedAmount: ['', Validators.compose([Validators.required ,Validators.maxLength(15)])],
    //   usedAmount: [''],
    //   Remarks: [''],
    //   Img: [''],

    // },
    // // { validator: this.checkDates   }
    // { validators: [this.checkAmount,this.checkDates,this.checkDates1] }
    // );
    

    this.getAddLimitDropdownData()

// console.log(this.data.FileName , "filename ashish");
 
    if (this.data?.isedit) {
      this.addLimitForm.patchValue(this.data)
      console.log("modal data ", this.data);
      if(this.data?.FileName)
      this.fileName = this.splitpipe.transform(this.data?.FileName)
    }

    // this.minDate = this.formDate;
    // this.maxDate = this.toDate;
         this.addLimitForm.valueChanges.subscribe((res:any)=>{
              // this.minDate = new Date(res.formDate);
              this.HedgeValidTomaxDate = new Date(res.HedgeValidTo)
              this.CreditLimitTomaxDate  = new Date(res.CreditLimitTo)
              this.HedgeValidTominDate   = new Date(res.HedgeValidFrom)
              this.CreditLimitTomixDate  = new Date(res.CreditLimitFrom)
          });
        if( this.data?.isCancel){
          this.addLimitForm.get('RequestedAmount')?.setValue(0);
        }
        if( this.data?.IsApprover){
          this.addLimitForm.controls['ApprovedRequestedAmount'].setValidators([Validators.required ,Validators.maxLength(15)])
          this.addLimitForm.controls['ExpiredLimitTo'].setValidators([Validators.required])
          //  this.addLimitForm.get('RequestedAmount')?.setValue(0);
        }
  }


//   downloadfile(file:any){
// console.log(file);
// // window.location.href(file)
//   }
fileRemoveName : Boolean = true;
fileRemove(){
  // alert ()
this.fileRemoveName = false;
}
  downloadfile( fileurl : any) {
// console.log(fileurl ,"fileurl");
// console.log(fileurl.split(/) );

    const a = document.createElement('a')
        a.href = fileurl
        a.download = 'archive.zip';
        a.click();
  }
  checkAmount(group: FormGroup) {
    
    // if(this.addLimitForm?.controls['limitType']?.value == 37){
    // return 
    // }
    // console.log(group['controls']['limitType'].value , "ashish");
    

     if(group['controls']['limitType'].value != 37 && group['controls']['limitType'].value != '' && group['controls']['limitType'].value != null && group['controls']['limitType'].value != undefined ){
    
    let r = Number(group['controls']['RequestedAmount'].value);
    let f =  (Number(group['controls']['TotalLimit'].value) - Number(group['controls']['usedAmount'].value));
  let t =Number(group['controls']['TotalLimit'].value);
    console.log(r + "r")
  console.log(f  + "f r")
  
  if (r  > f && group['controls']['limitType'].value == 70) {
  //  this.isError = true;
    return { notValid: true }
  }

  else  if (r  > t) {
    //this.isError = true;
    return { notValid: true }
  }

} else {
  // return { notValid: false }
  group.get('RequestedAmount')?.clearValidators()
  group.get('RequestedAmount')?.setValidators(Validators.required)
  // group.get('RequestedAmount')?.setValidators(Validators.maxLength(15))
}
  //this.isError = false;
    return null;
  }
  async getAddLimitDropdownData() {
    await this.limitlistService.getAddLimitDropdownData({
      "CustomerCode": this.data?.partnerCode
    }).subscribe((res: any) => {
      let result = res;
      // console.log(res , "test521");
      this.limitType = res.Response[0].HedgeTypes;
      this.cFlimitType = res.Response[0].CFTypes;

      if(this.limitType){
      let test = this.limitType.find((i: any) => i.Code == this.editdata?.LimitType);
      console.log(test, "test", this.limitType);
      if(this.editdata?.LimitType)
      this.addLimitForm.get('limitType')?.setValue(test.Code)
      }
      // CFTypes
      console.log(this.cFlimitType , "cflimit type")
      this.partenerCFAmounts = res.Response[0].PartenerCFAmounts;
      let totalA: any = 0;
      
      for (let item of res?.Response[0]?.PartenerCFAmounts) {
        totalA = totalA +Number( item.Amount);
      }
      this.addLimitForm.controls['usedAmount']?.setValue(totalA);
 
    
      // console.log(this.limitType , "trst", this.editdata?.LimitType);


    });
  }
  rAChanged(e: any){
    
    let dif = this.addLimitForm.controls['limitType'].value - this.totalAmount;
    
    if(dif){
     
      
    }
   // this.reqA =Number( e.target.value);
  }
  async getAddLimitPopUpData(data: any) {
    await this.limitlistService.getAddLimitPopUpData(data).subscribe((res: any) => {
      let result = res.Response[0];

      // console.log(res , "test521");
      //  this.limitType = res.Response[0].HedgeTypes;
      //  this.cFlimitType = res.Response[0].CFTypes;
      //  this.partenerCFAmounts = res.Response[0].PartenerCFAmounts;
      //  let test = this.limitType.find((i:any) => i.Code == this.editdata?.LimitType);
      //  console.log(test, "test", this.limitType);

      this.addLimitForm.get('AccountNumber')?.setValue(result?.AccountNumber);
      this.addLimitForm.get('BankName')?.setValue(result?.Bank);
      this.addLimitForm.get('TotalLimit')?.setValue(result?.TotalLimit);
     let newdate :any  =  new Date(result?.HedgeValidTo).getFullYear() < (new Date().getFullYear() - 50) ? new Date() :new Date(result?.HedgeValidTo); 
     let newdate1 :any  =  new Date(result?.CreditValidTo).getFullYear() < (new Date().getFullYear() - 50) ? new Date() :new Date(result?.CreditValidTo); 
      this.addLimitForm.get('HedgeValidTo')?.setValue(newdate);
      this.addLimitForm.get('CreditLimitTo')?.setValue( newdate1);
      // console.log(this.limitType , "trst", this.editdata?.LimitType)  result?.HedgeValidTo;
      this.addLimitForm.get('HedgeValidFrom')?.setValue(new Date());
      this.addLimitForm.get('CreditLimitFrom')?.setValue(new Date());

    });
  }
  chnageCfLimit() {
    let data: any = {
      "CustomerCode": this.data?.partnerCode,

      "HedgeType": this.addLimitForm.controls['limitType'].value,
      "CFTypes": this.addLimitForm.controls['CFLimitType'].value
    };
    this.getAddLimitPopUpData(data);
  }
  partnerInvestment() {
if(this.addLimitForm.controls['limitType'].value == 70 || this.addLimitForm.controls['limitType'].value == 37)
this.isReadOnly = true;
else 
this.isReadOnly = false;
console.log(this.addLimitForm.controls['limitType'].value);

    if (this.addLimitForm.controls['limitType'].value == 70) {
      // this.addLimitForm.controls['CFLimitType'].setValue('CFT-001');

      this.addLimitForm.controls['CFLimitType'].setValidators([Validators.required])
      this.addLimitForm.controls['CFLimitType'].updateValueAndValidity();

    } else {
      this.addLimitForm.controls['CFLimitType'].setValue('');
      this.addLimitForm.controls['CFLimitType'].setValidators([])
      this.addLimitForm.controls['CFLimitType'].updateValueAndValidity()
    }
    let data: any = {
      "CustomerCode": this.data?.partnerCode,

      "HedgeType": this.addLimitForm.controls['limitType'].value,
      "CFTypes": this.addLimitForm.controls['CFLimitType'].value
    };
    if(this.addLimitForm.controls['limitType'].value == 70 || this.addLimitForm.controls['limitType'].value == 37 ){
    this.getAddLimitPopUpData(data);
    } else {
      this.addLimitForm.get('AccountNumber')?.setValue('');
      this.addLimitForm.get('BankName')?.setValue('');
      this.addLimitForm.get('TotalLimit')?.setValue('');
    //  let newdate :any  =  new Date(result?.HedgeValidTo).getFullYear() < (new Date().getFullYear() - 50) ? new Date() :new Date(result?.HedgeValidTo); 
    //  let newdate1 :any  =  new Date(result?.CreditValidTo).getFullYear() < (new Date().getFullYear() - 50) ? new Date() :new Date(result?.CreditValidTo); 
      this.addLimitForm.get('HedgeValidTo')?.setValue('');
      this.addLimitForm.get('CreditLimitTo')?.setValue( '');
      // console.log(this.limitType , "trst", this.editdata?.LimitType)  result?.HedgeValidTo;
      this.addLimitForm.get('HedgeValidFrom')?.setValue('');
      this.addLimitForm.get('CreditLimitFrom')?.setValue('');
    }

  }
  get f() { return this.addLimitForm.controls }
  upload(event: any) {
    if (event.target.files.length > 0) {
      this.addLimitForm.patchValue({
        Img: event.target.files[0],
      })
    }
    // const target= event.target as HTMLInputElement;
    // const file: File = (target.files as FileList)[0];
    // this.addLimitForm.patchValue({
    //   img: file
    // });
    // this.addLimitForm.controls['Img'].updateValueAndValidity()
    // const file = event.target.files[0];
    // this.addLimitForm.patchValue({
    //   Img: file
    // });
    // this.addLimitForm.controls['Img'].updateValueAndValidity()
  }
  close() {
    this.dialogRef.close();
  }
  submit() {
    this.submita = true;
  
    if (this.addLimitForm.valid && !this.isError) {
     if(this.data?.IsApprover){
       let obj : any ={
        "AddLimitCode": this.data?.AddLimitRequestCode ?? '',
        "ApprovedAmount": this.addLimitForm.controls['ApprovedRequestedAmount'].value,
        "ApprovedTill":  this.addLimitForm.controls['ExpiredLimitTo'].value
      };

     this.limitlistService.ApproverEditLimit(obj).subscribe((res: any) => {
       // this.loader.hide()
        this.dialogRef.close(res);
      })
     }else{
      let obj: any = {

      };
      let formData: any = new FormData();
      formData.append("Attachment",  this.addLimitForm.controls['Img'].value  );
      obj["LimitType"] = this.addLimitForm.controls['limitType'].value.toString();
      obj["CFLimitType"] = this.addLimitForm.controls['CFLimitType'].value;
      obj["BankName"] = this.addLimitForm.controls['BankName'].value;
      obj["AccountNumber"] = this.addLimitForm.controls['AccountNumber'].value;

      obj["CreditLimitTo"] = this.addLimitForm.controls['CreditLimitTo'].value;
      obj["CreditLimitFrom"] = this.addLimitForm.controls['CreditLimitFrom'].value;
      obj["HedgeValidTo"] = this.addLimitForm.controls['HedgeValidTo'].value;
      obj["HedgeValidFrom"] = this.addLimitForm.controls['HedgeValidFrom'].value;
      obj["TotalLimit"] = this.addLimitForm.controls['TotalLimit'].value;

      obj["CustomerCode"] = this.data?.partnerCode;
      obj["AddUpdateDelete"] = this.data?.isedit ?( this.data?.iseditCurrent ? 0 : 1 ): 0;
      obj["Remarks"] = this.addLimitForm.controls['Remarks'].value;
      obj["RequestedAmount"] =  Number(this.addLimitForm.controls['RequestedAmount'].value);
      obj["AddLimitRequestCode"] = this.data?.isedit ? this.data?.AddLimitRequestCode??'' : '';
      obj["IsAttachmentDeleted"] =  this.data?.isedit ?   this.fileRemoveName == false ?  true :  this.addLimitForm.controls['Img'].value ? true : false : false;
      obj["AttachmentName"] = this.data?.isedit ? this.addLimitForm.controls['Img'].value ?  null : this.fileName : null; 
      console.log(JSON.stringify(obj));
      formData.append("JsonData", JSON.stringify(obj));

      //     JsonData
      // console.log(formData)
      //     let objetdata : any  =  formData.getAll();
      // console.log(formData)
      this.loader.show()
      this.limitlistService.addUpdateDeleteLimit(formData).subscribe((res: any) => {
        this.loader.hide()
        this.dialogRef.close(res);
      })
     }
    }


    // this.http.post(this.API, formData).subscribe(
    //   (response) => console.log(response),
    //   (error) => console.log(error)
    // )
  }

  addEvent(type: string, event: any) {
    console.log(`${type}: ${event.value}`);
    if (type == 'hf') {
      this.addLimitForm.controls['HedgeValidFrom'].setValue(event.value);
    }
    if (type == 'ht') {
      this.addLimitForm.controls['HedgeValidTo'].setValue(event.value);
    }
    if (type == 'cf') {
      this.addLimitForm.controls['CreditLimitFrom'].setValue(event.value);
    }
    if (type == 'ct') {
      this.addLimitForm.controls['CreditLimitTo'].setValue(event.value);
    }
  }



  keyPressNumbers(event: any) {
    var charCode = (event.which) ? event.which : event.keyCode;
    // Only Numbers 0-9
    if ((charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }
}
