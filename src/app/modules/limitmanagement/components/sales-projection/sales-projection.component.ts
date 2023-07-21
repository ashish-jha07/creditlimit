import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { dateInputsHaveChanged } from '@angular/material/datepicker/datepicker-input-base';

import { MatDialog } from '@angular/material/dialog';
import { ExcelDownloadKitConfig } from 'src/app/core/services/constants/const';
import { BsubjectService } from 'src/app/core/services/storage/bsubject.service';
import { StorageService } from 'src/app/core/services/storage/storage.service';
import { UiService } from 'src/app/core/services/ui/ui.service';
import { UtilService } from 'src/app/core/services/util/util.service';
import { CommanDialogComponent } from 'src/app/modules/shared/components/comman-dialog/comman-dialog.component';
import { DialogsalesprojectionComponent } from 'src/app/modules/shared/components/dialogsalesprojection/dialogsalesprojection.component';
import { DownLoadSalesReq, DownLoadSalesResponse, SalesProjectionReq, SalesProjectionResponse } from '../../interfaces/sales';
import { SalesService } from '../../sarvices/sales.service';

@Component({
  selector: 'app-sales-projection',
  templateUrl: './sales-projection.component.html',
  styleUrls: ['./sales-projection.component.scss']
})
export class SalesProjectionComponent implements OnInit {
  requestType : any = false;
  dateRangediff: Boolean =false ;
  submita: any;
  minDateError:any;
  submit: any;
  isOpen: any;
  isEmty: any;
  Records: any;
  user: any;
  regiones: any;
  notExcel:any;
  minDate  =  new Date(new Date().setFullYear(new Date().getFullYear() - 2)).toISOString().substring(0,7);
  maxDate  : any;
  uploadForm: FormGroup = this.fb.group({
    fileexcel: [null, Validators.required],
  });

  downloadData: FormGroup = this.fb.group({
    region: ['', Validators.required],
    startDate: [new Date().toISOString().substring(0,7), Validators.required],
    endDate: [new Date().toISOString().substring(0,7), Validators.required],
  
  }, { validator: this.checkDates });
  constructor(private fb: FormBuilder, private storage : StorageService,  public dialog: MatDialog,private utilService: UtilService, private salesService: SalesService,
    private uiService: UiService, private excelDownloadKitConfig: ExcelDownloadKitConfig, private bs: BsubjectService
  ) {
    this.bs.getSideMenus().subscribe((res: any) => {
      this.isOpen = res;
    })

  }
  getMinDate(){
    // return this.f?.['endDate']?.value?.toISOString()?.substring(0,7);
    // if(this.downloadData.get('endDate')?.value.length == 7){
    //   return this?.downloadData.get('endDate')?.value
    // }
    // else {
    //   return this?.downloadData.get('endDate')?.value?.toISOString()?.substring(0,7)
    // }
    
    // return this?.downloadData.get('startDate')?.value
    // new Date(new Date().setFullYear(new Date().getFullYear() - 1));

    // this.minDate = new Date(new Date().setFullYear(new Date().getFullYear() - 2));
    const minDate = new Date(this.minDate);
    const inputDate = new Date(this.downloadData.get('startDate')?.value);

    if (inputDate < minDate) {
      return this.minDateError = true;
    }
    console.log(this.minDateError, "mindate");
    return this.minDateError = false;
    
    
  }
  calculateDiff(){
    let date = new Date( this.downloadData.get('startDate')?.value);
    let currentDate = new Date(this.downloadData.get('endDate')?.value);

    let days = Math.floor((currentDate.getTime() - date.getTime()) / 1000 / 60 / 60 / 24);
    // return days;
    console.log(days , "days");
    if(days >=0 && days < 730){
      this.dateRangediff = false;
    } else {
      this.dateRangediff = true
    }
  }
  // dateRangeCheck(){

  // }

  getMaxDate(){
    // return this.f?.['endDate']?.value?.toISOString()?.substring(0,7);
    // if(this.downloadData.get('startDate')?.value.length == 7){
    //   return this?.downloadData.get('startDate')?.value
    // }
    // else {
    //   return this?.downloadData.get('startDate')?.value?.toISOString()?.substring(0,7)
    // }
    


  }

  ngOnInit(): void {
    this.downloadData.valueChanges.subscribe((res:any)=>{
      // this.minDate = new Date(res.formDate);

      // this.maxDate = new Date(res.toDate)
  });    
    this.user = this.storage.getLocalObject('user');
    let data: any = {
      RoleCode: this.user.Role
    }
     this.salesService.getRegion(data).subscribe((res:any)=>{
      this.regiones = res.Response[0].Regions;
    
    })
    let startdate: any = new Date();
    startdate.setMonth(startdate.getYear() - 2);
   // new Date().toISOString().substring(0, 7) this.downloadData.controls['startDate'].setValue(startdate.toISOString(). substring(0, 8));
    // this.downloadData.controls['endDate'].setValue(new Date().toISOString().split('T')[0]);
    console.log("date value "+ new Date().toISOString().split('T')[0])
  }
  get f() { return this.downloadData.controls }
  get fileexcel() { return this.uploadForm.get('fileexcel'); }

//  this method used data validation
checkDates(group: FormGroup) {
  if (group['controls']['startDate'].value > group['controls']['endDate'].value) {
  
    return { notValid: true }
  }
  return null;
}
  downloadkit() {

    let headers;
    let file_Name;
    headers = this.excelDownloadKitConfig.SALES_PROJECTION_HEADER_ARRAY;
    file_Name = this.excelDownloadKitConfig.DOWNLOADKIT_FILENAME_SALES_PROJECTION

    this.utilService.getDownloadkit(headers, file_Name);
  }
  deletefile(e: any) {
    this.isEmty = undefined
    // this.fileData = []
    this.notExcel = undefined;

    this.uploadForm.controls['fileexcel'].setValue(null);
  }

  /**This method used for download excel file */

  /**This method used for handle file upload event */
  findfile(event: any) {
    this.isEmty = undefined;
    this.notExcel =  undefined;
    const target: DataTransfer = <DataTransfer>(event.target);
    console.log("control value " + this.uploadForm.controls['fileexcel'].value)
    if (target.files.length !== 1)
      throw new Error('Cannot use multiple files');

    if (event.target.files.length > 0 && !!event.target.files[0].name.match(/(.xls|.xlsx)/)) {
      this.utilService.readExcelFileKey(event.target.files[0],  this.excelDownloadKitConfig.SALES_PROJECTION_HEADER_ARRAY_KEY,  (res: any) => {
        if (res.length < 1) {
          this.isEmty = true
        } else {
          console.log(JSON.stringify(res));
          this.Records = res;

        }

        //  this.fileData = res;
        //   if (this.fileData?.length < 1) {

        // //    this.errorMessage = SnackbarConfig.MESSAGE_UPLOAD_EXCELFILE_EMPTY;
        //    // this.uiService.openSnackBar(this.errorMessage, SnackbarConfig.ACTION_RETRY, SnackbarConfig.TIME_THREE_SECOND)

        //   }
        // this.filename = event.target.files[0].name;
      })

    }
    else {
      this.notExcel = true;
      //this.isEmty = undefined
     // this.uploadForm.controls['fileexcel'].setValue(null);



    }
  }

  uploadFileData() {
    this.submit = true;
    if(this.uploadForm.invalid || this.notExcel){
      return;
    }
   console.log(JSON.stringify(this.Records));
    let data: SalesProjectionReq = {
      Records: JSON.stringify(this.Records)
    }
     this.salesService.postSalesProjection(data).subscribe((res: SalesProjectionResponse)=>{
      let result =res;
      this.submit = false;
      if(res.StatusCode == 1){
        if(res.Response[0] != "") {
          let data = JSON.parse(res.Response[0]);
          console.log(data)
          let headerArray : any = [];
          let dataArray : any = [];
          let i = 0;
          for (let item of data) {
           let dataA : any = [];
           for (let keys in item) {
            if(i == 0){
              let d =keys // .replace(/([a-z])([A-Z])/g, '$1 $2');;
             console.log(d);
             headerArray.push(d);
            }
            dataA.push(item[keys])
           }
           i++;
           dataArray.push(dataA)
         }
         console.log(dataArray, headerArray)
   
 
        
          const dialogRef = this.dialog.open(DialogsalesprojectionComponent, {
            
            data: {title: this.uploadForm.controls['fileexcel'].value.split("\\").pop(), name: res.Message, datastatus: false, recordsData: {"dataArray":dataArray, "headerArray":headerArray}},
          });
      
          dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            //this.animal = result;
          });
        }else {
          const dialogRef = this.dialog.open(DialogsalesprojectionComponent, {
           
            data: {title: this.uploadForm.controls['fileexcel'].value.split("\\").pop(), name: res.Message,  datastatus: true},
          });
      
          dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            //this.animal = result;
          });
        }
      }
    
     
      console.log("result sales projection" + JSON.stringify(result));
      this.isEmty = undefined
      this.uploadForm.controls['fileexcel'].setValue(null);
    });
  
   
  }

  downLoadExcelFile(){
    this.submita = true;
    if(this.downloadData.invalid || this.dateRangediff || this.minDateError){
      return;
    }

//let dat1 = this.downloadData.controls['startDate'].value.toISOString().split('T')[0];
let data: DownLoadSalesReq = {
      Region: this.downloadData.controls['region'].value,
      StartDate:this.downloadData.controls['startDate'].value,
      EndDate:this.downloadData.controls['endDate'].value,
    }
    console.log(data)

  
    //.split('T')[0]
     this.salesService.getSalesProjection(data).subscribe((res: DownLoadSalesResponse)=>{
      if(res.Response[0] != "") {
       let data = JSON.parse(res.Response[0]);
       console.log(data)
       let headerArray : any = [];
       let dataArray : any = [];
       let i = 0;
       if(data.length > 0){
        for (let item of data) {
          let dataA : any = [];
          for (let keys in item) {
           if(i == 0){
             let d =keys // .replace(/([a-z])([A-Z])/g, '$1 $2');;
            console.log(d);
            headerArray.push(d);
           }
           dataA.push(item[keys])
          }
          i++;
          dataArray.push(dataA)
        }
        console.log(dataArray, headerArray)
  
       this.utilService.getDownloadFileWithData(headerArray,dataArray, "SalesProjectionData");
        this.uiService.openToastMessage("Download all records "+ res?.Message, '');
       }else {
        this.uiService.openToastMessage("Records not available "+ res?.Message, '');
        this.downloadkit();
       }
    
      // this.downloadData.reset()
      // region: ['', Validators.required],
      // startDate: [new Date().toISOString().substring(0,7), Validators.required],
      // endDate: [new Date().toISOString().substring(0,7), Validators.required],
       }else {
        this.downloadkit();
       }
       this.submita = false;
       this.downloadData.controls['region'].setValue('');
       this.downloadData.controls['startDate'].setValue(new Date().toISOString().substring(0,7));
       this.downloadData.controls['endDate'].setValue(new Date().toISOString().substring(0,7));
     });

  }
  addEvent(type: string, event: any) {
console.log(`${type}: ${event.value}`);

    this.downloadData.controls['startDate'].setValue(event.value);
  }
  addEvent1(type: string, event: any) {
    console.log(`${type}: ${event.value}`);
   
        this.downloadData.controls['endDate'].setValue(event.value);
      }
  select(event: any,startDate : any){

    let dat = event.split("T")[0];
    //this.downloadData.controls['startDate'].setValue(dat);
  }
}
