import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ExcelDownloadKitConfig, SnackbarConfig } from 'src/app/core/services/constants/const';
import { StorageService } from 'src/app/core/services/storage/storage.service';
import { LoaderService } from 'src/app/core/services/ui/loader.service';
import { UiService } from 'src/app/core/services/ui/ui.service';
import { UtilService } from 'src/app/core/services/util/util.service';
import { CommanDialogComponent } from 'src/app/modules/shared/components/comman-dialog/comman-dialog.component';
import { MasterDropdown } from '../../interface/master-dropdown';
import { MastermanagementService } from '../../service/mastermanagement.service';
// import { MAT_DATE_FORMATS } from '@angular/material/core';
import * as _moment from 'moment';
const moment = _moment;
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
// const MY_FORMATS  = {
//   parse: {
//     // dateInput: 'LL',
//   },
//   display: {
//     dateInput: 'MMMM YYYY',
//     monthYearLabel: 'MMMM YYYY',
//     dateA11yLabel: 'LL',
//     monthYearA11yLabel: 'MMMM YYYY',
//   },
// }
@Component({
  selector: 'app-uploadexcel',
  templateUrl: './uploadexcel.component.html',
  styleUrls: ['./uploadexcel.component.scss'],
  providers: [DatePipe,
    // {
    //   provide: DateAdapter,
    //   useClass: MomentDateAdapter,
    //   deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    // },

    // {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ]
})

export class UploadexcelComponent implements OnInit {
  @ViewChild('inputFile') inputFile!: ElementRef;
  fileData                          : Array<any> = [];
  filename                         !: string;
  errorflag                        !: Boolean
  errorMessage: string = SnackbarConfig.MESSAGE_UPLOAD_EXCELFILE_NOT_VALID;
  masterName                       !: MasterDropdown;
  fileDownloadForm                 !: FormGroup
  masterDropDownList                : Array<any> = []
  user                              : any;
  headers                           !:Array<any>;
  file_Name                         !:any;
  FileDate                          :any
  unavailability = { startDate:"2017-11-04T22:00:00.000Z", endDate: "2017-11-24T22:00:00.000Z" }
  constructor(private fb: FormBuilder, private utilService: UtilService, private loader : LoaderService,
    private uiService: UiService, private excelDownloadKitConfig: ExcelDownloadKitConfig,
    private mastermanagementService: MastermanagementService, private datepipe : DatePipe, public dialog: MatDialog, private storageService: StorageService) {

    // This form for download data 
    this.fileDownloadForm = this.fb.group({
      from_date: [new Date(), Validators.required],
      To_date:   [new Date(), Validators.required]
    }, { validator: this.checkDates }
    )

  }

  ngOnInit(): void {
    this.user = this.storageService.getLocalObject('user');
    this.getMasterDropDownlist(this.user?.Role)
    this.modelChangeFn('event')
    // this.loader.show()
    // this.loader.hide()
    
  }

  /**This method used for delete file */
  deletefile() {
    this.errorflag = false
    this.fileData = []
    this.filename = '';
    // this.inputFile.nativeElement.value = '';
    (<HTMLInputElement>document.getElementById('file')).value = ''; 
  }

  /**This method used for download excel file */
  downloadkit() {
    switch (this.masterName.ModuleCode) {
      case 'CDC':
        this.headers = this.excelDownloadKitConfig.CASH_DISCOUNT_HEADER_ARRAY;
        this.file_Name = this.excelDownloadKitConfig.UPLOADEXCEL_DOWNLOADKIT_FILENAME_CASH_DISCOUNT
        break;
      case 'ARH':
        this.headers = this.excelDownloadKitConfig.AR_HISTORY_HEADER_ARRAY;
        this.file_Name = this.excelDownloadKitConfig.DOWNLOADKIT_FILENAME_AR_HISTORY
        break;
      case 'CDH':
        this.headers = this.excelDownloadKitConfig.CHEQUE_DISHNOUR_HEADER_ARRAY;
        this.file_Name = this.excelDownloadKitConfig.DOWNLOADKIT_FILENAME_CDH
        break;
        case 'SHT':
          this.headers = this.excelDownloadKitConfig.SALE_HISTORY_HEADER_ARRAY;
          this.file_Name = this.excelDownloadKitConfig.DOWNLOADKIT_FILENAME_SHT
          break;
        case 'SCE': //evalutaion
        this.headers = this.excelDownloadKitConfig.SCESE_VALUATION_HEADER_ARRAY;
        this.file_Name = this.excelDownloadKitConfig.DOWNLOADKIT_FILENAME_SCE
          break;
        case 'SCS': //financeila sces
        this.headers = this.excelDownloadKitConfig.SCESE_FINANCIAL_HEADER_ARRAY;
        this.file_Name = this.excelDownloadKitConfig.DOWNLOADKIT_FILENAME_SCS
          break;
          case 'WOS':
            this.headers = this.excelDownloadKitConfig.WOS_HEADER_ARRAY;
            this.file_Name = this.excelDownloadKitConfig.DOWNLOADKIT_FILENAME_WOS
        break;
      case 'SEO':
        this.headers = this.excelDownloadKitConfig.SELL_OUT_HEADER_ARRAY;
        this.file_Name = this.excelDownloadKitConfig.DOWNLOADKIT_FILENAME_SEO
        break;
      case 'CLD':
        this.headers = this.excelDownloadKitConfig.CREDIT_LIMIT_DATA_HEADER_ARRAY;
        this.file_Name = this.excelDownloadKitConfig.DOWNLOADKIT_FILENAME_CLD
        break;
        case 'PIM':
          this.headers = this.excelDownloadKitConfig.PARTNER_INVESTMENT_HEADER_ARRAY;
          this.file_Name = this.excelDownloadKitConfig.DOWNLOADKIT_FILENAME_PIM
        break;
      case 'ARR':
        this.headers = this.excelDownloadKitConfig.AR_RECONSILATION_HEADER_ARRAY;
        this.file_Name = this.excelDownloadKitConfig.DOWNLOADKIT_FILENAME_ARR
        break;
      case 'BPR':
        this.headers = this.excelDownloadKitConfig.BP_RELATION_HEADER_ARRAY;
        this.file_Name = this.excelDownloadKitConfig.DOWNLOADKIT_FILENAME_BPR
        break;
      case 'CUM':
        this.headers = this.excelDownloadKitConfig.CUSTOMER_MASTER_HEADER_ARRAY;
        this.file_Name = this.excelDownloadKitConfig.DOWNLOADKIT_FILENAME_CUM
        break;
        case 'CFN':
          this.headers = this.excelDownloadKitConfig.CHANEL_FINANACE_HEADER_ARRAY;
          this.file_Name = this.excelDownloadKitConfig.DOWNLOADKIT_FILENAME_CFN
          break;
          case 'INS':
            this.headers = this.excelDownloadKitConfig.INSURANCE_MASTER_HEADER_ARRAY;
            this.file_Name = this.excelDownloadKitConfig.DOWNLOADKIT_FILENAME_INS
            break;
            case 'CHR':
              this.headers = this.excelDownloadKitConfig.CHECK_RULE_HEADER_ARRAY;
              this.file_Name = this.excelDownloadKitConfig.DOWNLOADKIT_FILENAME_CHR
              break;
            
      default:
        console.log("No such file exists!");
        break;
    }
    this.utilService.getDownloadkit(this.headers, this.file_Name);
  }

  /**This method used for handle file upload event */
  findfile(event: any) {
    // console.log(event.target.files[0].name, "tes") ;
  

    this.errorflag = false;
    const target: DataTransfer = <DataTransfer>(event.target);
    if (target.files.length !== 1){
      // throw new Error('Cannot use multiple files');
    this.errorMessage = "Cannot use multiple files"
    this.uiService.openSnackBar(this.errorMessage, SnackbarConfig.ACTION_RETRY, SnackbarConfig.TIME_THREE_SECOND)
    }
    if (event.target.files.length > 0 && !!event.target.files[0].name.match(/(.xls|.xlsx)/)) {
      this.utilService.readExcelFiles(event.target.files[0], (res: any) => {
        // console.log(res , "file data upload");        
        if(this.masterName.ModuleCode == 'ARH' || this.masterName.ModuleCode == 'CLD'){
          let name = event.target.files[0].name.split("_")
          // console.log(name[name.length-1].split('.').slice(0, -1).join('.') , "file name");
          // filename.split('.').slice(0, -1).join('.')
          this.FileDate = name[name.length-1].split('.').slice(0, -1).join('.');
        } else {
          this.FileDate = null
        }
        if (res){
          this.fileData = res;
        switch (this.masterName.ModuleCode) {
          case 'SHT':
          case 'CDC':
          case 'CDH':
          case 'ARH':
          case 'ARR':
          case 'WOS':
          case 'BPR':
          case 'CUM':
          case 'CLD':
          case 'PIM':
          case 'SCE':
          case 'SCS':
          case 'CFN':
          case  'INS':
          case 'CHR':
          this.dataMap(res)
            break;
          default:
            // recommended_org = "No Recommendation"
        }

        }
          // this.fileData = res;
        if (this.fileData && this.fileData?.length < 1) {
          this.errorflag = true
          this.errorMessage = SnackbarConfig.MESSAGE_UPLOAD_EXCELFILE_EMPTY;
          // this.uiService.openSnackBar(this.errorMessage, SnackbarConfig.ACTION_RETRY, SnackbarConfig.TIME_THREE_SECOND)

        }
        if(this.FileDate){
        //  console.log(isNaN (this.FileDate))
        if(isNaN (this.FileDate)){
          this.errorflag = true
          this.errorMessage = "File name should be contain date. "
        
        }
        }
        this.filename = event.target.files[0].name;
      })

    }
    else {
      this.errorMessage = SnackbarConfig.MESSAGE_UPLOAD_EXCELFILE_NOT_VALID
      this.fileData = []
      // this.uiService.openSnackBar(this.errorMessage, SnackbarConfig.ACTION_RETRY, SnackbarConfig.TIME_THREE_SECOND)
      this.filename = '';
      // this.inputFile.nativeElement.value = '';
      (<HTMLInputElement>document.getElementById('file')).value = ''; 

      this.errorflag = true
    }
  }




  uploadFileData() {
    let payload = {
      "Records"   : JSON.stringify(this.fileData),
      "MasterCode": this.masterName.ModuleCode,
      "FileDate"  :  this.FileDate
    }
    // if(this.masterName.ModuleCode == 'ARH' || this.masterName.ModuleCode == 'CLD')
        //  payload['FileDate'] = this.FileDate;
    
    this.loader.show()
    this.mastermanagementService.UploadMasters(payload).subscribe(res => {
      this.loader.hide()
      if(res?.Message == 'Failed' && res?.StatusCode == 0){
        this.uiService.openSnackBar(res?.Message, "retry" ,SnackbarConfig.TIME_THREE_SECOND)

      }
      if(res?.IsSucsess && res?.StatusCode == 0 ){
        // alert()
        // this.uiService.openSnackBar(res?.Message, "retry" ,SnackbarConfig.TIME_THREE_SECOND)
        const dialogRef = this.dialog.open(CommanDialogComponent, {
          data: {title: this.filename, name: res.Message},
        });
    
        dialogRef.afterClosed().subscribe(result => {
          this.deletefile()
        });
      }             
        if(res && res.Response && res.Response != 'null' && res.Response[0] != ""  ) {
          const dialogRef = this.dialog.open(CommanDialogComponent, {
            data: {title: this.filename, name: res.Response[0]},
          });
      
          dialogRef.afterClosed().subscribe(result => {
            this.deletefile()
          });
        } else {

        }
      
      
    })
  }



// This method for access formcontrol
  get f() {
    return this.fileDownloadForm.controls;
  }

  // this method used for get master dropdown list
  getMasterDropDownlist(RoleCode:any) {
    let payload = {
      "RoleCode": RoleCode
    }    
    this.mastermanagementService.GetModuleMasterDropdown(payload).subscribe(
      res => {
        if (res && res.IsSucsess && res.StatusCode == 1 && res?.Response) {
          this.masterDropDownList = res?.Response
          // console.log(tshis.masterDropDownList, "mastrdropdown");
          
          this.masterName = this.masterDropDownList[0]
        }
      }
    )

  }

  

//  this method used data validation
  checkDates(group: FormGroup) {
    if (group['controls']['from_date'].value > group['controls']['To_date'].value) {
      return { notValid: true }
    }
    return null;
  }

  downloadData() {
    switch (this.masterName.ModuleCode) {
        case 'CDC':
          this.headers = this.excelDownloadKitConfig.CASH_DISCOUNT_HEADER_ARRAY;
          this.file_Name = this.excelDownloadKitConfig.UPLOADEXCEL_DOWNLOADKIT_FILENAME_CASH_DISCOUNT
          break;
        case 'ARH':
          this.headers = this.excelDownloadKitConfig.AR_HISTORY_HEADER_ARRAY_Download;
          this.file_Name = this.excelDownloadKitConfig.DOWNLOADKIT_FILENAME_AR_HISTORY
          break;
        case 'CDH':
          this.headers = this.excelDownloadKitConfig.CHEQUE_DISHNOUR_HEADER_ARRAY;
          this.file_Name = this.excelDownloadKitConfig.DOWNLOADKIT_FILENAME_CDH
          break;
          case 'SHT':
            this.headers = this.excelDownloadKitConfig.SALE_HISTORY_HEADER_ARRAY;
            this.file_Name = this.excelDownloadKitConfig.DOWNLOADKIT_FILENAME_SHT
            break;
          case 'SCE': //evalutaion
          this.headers = this.excelDownloadKitConfig.SCESE_VALUATION_HEADER_ARRAY;
          this.file_Name = this.excelDownloadKitConfig.DOWNLOADKIT_FILENAME_SCE
            break;
          case 'SCS': //financeila sces
          this.headers = this.excelDownloadKitConfig.SCESE_FINANCIAL_HEADER_ARRAY;
          this.file_Name = this.excelDownloadKitConfig.DOWNLOADKIT_FILENAME_SCS
            break;
            case 'WOS':
              this.headers = this.excelDownloadKitConfig.WOS_HEADER_ARRAY_download;
              this.file_Name = this.excelDownloadKitConfig.DOWNLOADKIT_FILENAME_WOS
          break;
        case 'SEO':
          this.headers = this.excelDownloadKitConfig.SELL_OUT_HEADER_ARRAY;
          this.file_Name = this.excelDownloadKitConfig.DOWNLOADKIT_FILENAME_SEO
          break;
        case 'CLD':
          this.headers = this.excelDownloadKitConfig.CREDIT_LIMIT_DATA_HEADER_ARRAY;
          this.file_Name = this.excelDownloadKitConfig.DOWNLOADKIT_FILENAME_CLD
          break;
          case 'PIM':
            this.headers = this.excelDownloadKitConfig.PARTNER_INVESTMENT_HEADER_ARRAY;
            this.file_Name = this.excelDownloadKitConfig.DOWNLOADKIT_FILENAME_PIM
          break;
        case 'ARR':
          this.headers = this.excelDownloadKitConfig.AR_RECONSILATION_HEADER_ARRAY;
          this.file_Name = this.excelDownloadKitConfig.DOWNLOADKIT_FILENAME_ARR
          break;
        case 'BPR':
          this.headers = this.excelDownloadKitConfig.BP_RELATION_HEADER_ARRAY;
          this.file_Name = this.excelDownloadKitConfig.DOWNLOADKIT_FILENAME_BPR
          break;
        case 'CUM':
          this.headers = this.excelDownloadKitConfig.CUSTOMER_MASTER_HEADER_ARRAY;
          this.file_Name = this.excelDownloadKitConfig.DOWNLOADKIT_FILENAME_CUM
          break;
          case 'CFN':
            this.headers = this.excelDownloadKitConfig.CHANEL_FINANACE_HEADER_ARRAY;
            this.file_Name = this.excelDownloadKitConfig.DOWNLOADKIT_FILENAME_CFN
            break;
            case 'INS':
              this.headers = this.excelDownloadKitConfig.INSURANCE_MASTER_HEADER_ARRAY;
              this.file_Name = this.excelDownloadKitConfig.DOWNLOADKIT_FILENAME_INS
              break;
              case 'CHR':
                this.headers = this.excelDownloadKitConfig.CHECK_RULE_HEADER_ARRAY;
                this.file_Name = this.excelDownloadKitConfig.DOWNLOADKIT_FILENAME_CHR
                break;
        default:
          console.log("No such file exists!");
          break;
      }
    if(this.fileDownloadForm.invalid)
    // console.log("invalid data", );
    if(this.fileDownloadForm.valid){
      // console.log(this.fileDownloadForm.controls['from_date'].value , "form date", this.fileDownloadForm.controls['To_date'].value, "EndDate:" );
      
    }
   let payload = {
      StartDate: this.utilService.getUTCDate (this.fileDownloadForm.controls['from_date'].value),
      EndDate: this.utilService.getUTCDate(this.fileDownloadForm.controls['To_date'].value),
      MasterCode: this.masterName.ModuleCode
    }

    this.loader.show()
    this.mastermanagementService.downloadMasters(payload).subscribe( res => {
      // console.log(res);
      this.loader.hide()
      if(res?.Response){
        // console.log(JSON.parse(res?.Response));  
        if(res.Response[0] != "") {
          let data = JSON.parse(res.Response[0]);
          // console.log(data)
          let headerArray : any = [];
          let dataArray : any = [];
          let i = 0;
          for (let item of data) {
           let dataA : any = [];
           for (let keys in item) {
            if(i == 0){
             headerArray.push(keys)
            }
            dataA.push(item[keys])
           }
           i++;
           dataArray.push(dataA)
         }
        //  alert(this.file_Name)
        //  console.log(dataArray, "dataarray", headerArray, "headderaary")
        //  console.log(this.headers, "headerstest", this.file_Name);
         
        this.utilService.downloadMasters(this.headers,dataArray, this.file_Name);
        //  this.uiService.openToastMessage(""+ res?.Message, 'show');
        const dialogRef = this.dialog.open(CommanDialogComponent, {
          data: { name: "File downloaded successfully !"},
        });
    
        dialogRef.afterClosed().subscribe(result => {
          // this.deletefile()
        });
          }
      }
    })
    
  }


  dataMap(data:any){
    let records: any = {
      "Records": [],
    }
    if(this.masterName.ModuleCode == 'CDC'){
    data.forEach((dataObj: any) => {
      records.Records.push(
        {
          "CnTy"     : dataObj['CnTy'],
          "Tab"      : dataObj['Tab'],
          "SOrg"     : dataObj['SOrg'],
          "Dv"       : dataObj['Dv'],
          "Customer" : dataObj['Customer'],
          "PayT"     : dataObj['PayT'],
          "ReSt"     : dataObj['ReSt'],
          "ValidTo"  : !isNaN(dataObj['Valid To']) ?  this.ExcelDateToJSDate(dataObj['Valid To'])     :   this.normalizeDate(dataObj['Valid To']) ,          
          "ValidFrom": !isNaN(dataObj['Valid From']) ? this.ExcelDateToJSDate(dataObj['Valid From'])  :  this.normalizeDate(dataObj['Valid From'])  , 
          "Amount"   : dataObj['Amount'],
          "Unit"     : dataObj['Unit'],
          "Per"      : dataObj['Per'],
          "UoM"      : dataObj['UoM'],    
        }
      )
    });
  }
  else  if(this.masterName.ModuleCode == 'test'){
    data.forEach((dataObj: any) => {
      records.Records.push(
        {
          // BusinessPartner                     varchar(25)			 NOT NULL,
          // Description                         varchar(100)		 NOT NULL,
          // CreditLimit                         numeric(15,2)		 NOT NULL,
          // CreditExposure						numeric(15,2)		 NOT NULL,
          // CLAvailableAmount 					numeric(15,2)		 NOT NULL,
          // CLExcessAmount 						numeric(15,2)		 NOT NULL,
          // UtilizationPercent					numeric(15,2)		 NOT NULL,
          // DaysInArrears                       numeric(8,2)		 NOT NULL,
          // RiskClass                           varchar(10)			 NOT NULL,
          // CreditCheckRule						varchar(20)			 NOT NULL,
          // Sales                               numeric(15,2)		 NOT NULL,
          // StatusPercent						numeric(8,2)		 NOT NULL,
          // BlockedInCreditManagement           varchar(50)			 NOT NULL,
          // DSO                                 numeric(8,2)		 NOT NULL,
          // ClerkAbbreviation                   bigint				 NOT NULL,
          // NameOfAccountingClerk               varchar(50)			 NOT NULL,
          // MaxOpenLimit 						varchar(50)			 NOT NULL,
          // ReasonForBlockInCreditManagement 	varchar(100)		 NOT NULL,
          "BusinessPartner"             : dataObj['Business Partner'],
          "Description"      : dataObj['Description'],
          "CreditLimit"       : dataObj['Credit Limit'],
          "CreditExposure"       : dataObj['Credit Exposure'],
          "CLAvailableAmount"         : dataObj['C/L Available Amount'],
          "UtilizationPercent"      : dataObj['Utilization %'],
          "DaysInArrears"          : dataObj['Days in Arrears'],
  // 'Max. open Limit ','Reason for block in Credit Management']
           "RiskClass"         : dataObj['Risk Class'],
          "CreditCheckRule"      : dataObj['Credit Check Rule'],
          "Sales"         : dataObj['Sales'],
          // "UtilizationPercent"      : dataObj['Utilization %'],
          "StatusPercent"          : dataObj['Status %'],
          "BlockedInCreditManagement"      : dataObj['Blocked in Credit Management'],
          "DSO"         : dataObj['DSO'],
          "ClerkAbbreviation"      : dataObj['Clerk Abbreviation'],
          "NameOfAccountingClerk"          : dataObj['Name of Accounting Clerk'],
          "MaxOpenLimit"          : dataObj['Max. open Limit '],
          "ReasonForBlockInCreditManagement"          : dataObj['Reason for block in Credit Management'],
        }
      )
    });
  }


  else  if(this.masterName.ModuleCode == 'CFN'){
    data.forEach((dataObj: any) => {
      records.Records.push(
        {
          "CFBank"             : dataObj['CF Bank'],
          "AccountNumber"      : dataObj['Account Number'],
          "CustomerName"       : dataObj['Customer Name'],
          "CustomerCode"       : dataObj['Customer Code'],
          "TotalLimit"         : dataObj['Total Limit'],
          "LimitValidity"      : !isNaN(dataObj['Limit Validity']) ?  this.ExcelDateToJSDate(dataObj['Limit Validity'])     :   this.normalizeDate(dataObj['Limit Validity']) ,
          "LimitType"          : dataObj['Limit Type'],
        }
      )
    });
  }
  else  if(this.masterName.ModuleCode == 'INS'){
    data.forEach((dataObj: any) => {
      records.Records.push(
        {
          "InsuranceCompany"             : dataObj['Insurance Company'],
          "LimitType"                    : dataObj['Limit Type'],
          "InsuranceCode"                : dataObj['Insurance Code'],
          "CustomerName"                 : dataObj['Customer Name'],
          "CustomerCode"                 : dataObj['Customer Code'],
          "LimitAmount"                  : dataObj['Limit Amount'],
          "HedgeValidityFrom"            : !isNaN(dataObj['Hedge Validity From']) ?  this.ExcelDateToJSDate(dataObj['Hedge Validity From'])     :   this.normalizeDate(dataObj['Hedge Validity From']) ,
          "HedgeValidityTo"              : !isNaN(dataObj['Hedge Validity To']) ?  this.ExcelDateToJSDate(dataObj['Hedge Validity To'])     :   this.normalizeDate(dataObj['Hedge Validity To']),
          "Rating"                       : dataObj['Rating'],
          "CELimit"                      : dataObj['CE Limit'],
          "MobileLimit"                  : dataObj['Mobile Limit'],
          "ServiceLimit"                 : dataObj['Service Limit'],
          "SAARC"                        : dataObj['SAARC'],
          "HedgeKey"                     : dataObj['Hedge Key'],
          "HedgeMethod"                  : dataObj['Hedge Method'],
          "PercentCover"                 : dataObj['% Cover'],
        }
      )
    });
  }

else  if(this.masterName.ModuleCode == 'PIM'){
    data.forEach((dataObj: any) => {
      records.Records.push(
        {
          "SoldtoCOde"             : dataObj['SoldtoCOde'],
          "MarketOSResponseID"     : dataObj['MarketOSResponseID'],
          "MarketOSWeekMasterID"   : dataObj['MarketOSWeekMasterID'],
          "MarketOSAgeingMasterID" : dataObj['MarketOSAgeingMasterID'],
          "MarketOSValue"          : dataObj['MarketOSValue'],
          "WeekStartDate"          : !isNaN(dataObj['WeekStartDate']) ?  this.ExcelDateToJSDate(dataObj['WeekStartDate'])     :   this.normalizeDate(dataObj['WeekStartDate']) ,          
          "WeekEndDate"            : !isNaN(dataObj['WeekEnd Date']) ? this.ExcelDateToJSDate(dataObj['WeekEnd Date'])  :  this.normalizeDate(dataObj['WeekEnd Date'])  , 
             
        }
      )
    });
  }

  else  if(this.masterName.ModuleCode == 'SCS'){
    data.forEach((dataObj: any) => {
      records.Records.push(
        {
          "RegionalHeadquater"                          : dataObj['Regional Headquater'],
          "CompanyCode"                                 : dataObj['Company code'],
          "CompanyCodeDescription"                      : dataObj['Company code description'],
          "BusinessArea"                                : dataObj['Business Area'],
          "BusinessAreaDescrption"                      : dataObj['Business Area Descrption'],
          "BusinessPartner"                             : dataObj['Business Partner'] ,          
          "PartnerName"                                 : dataObj['Partner Name'] , 

          "Currency"                                    : dataObj['Currency'],
          "AVGCreditRating"                             : dataObj['AVG. Credit Rating'],
          "SCESCreditRating"                            : dataObj['SCES Credit Rating'],
          "SCESCreditGrade"                             : dataObj['SCES Credit Grade'],
          "SCESCreditGradeDescription"                  : dataObj['SCES Credit Grade Description'],
          "SCESCreditLimit"                             : dataObj['SCES Credit Limit'],
          "SCES_VS_HedgeLimit_Percent"                  : dataObj['SCES vs Hedge Limit (%)'],
          "SCES_VS_InsuranceLimit_Percent"              : dataObj['SCES vs Insurance Limit (%)'],
          "SCES_VS_CreditLimit_Percent"                 : dataObj['SCES vs Credit  Limit (%)'],
          "ARBalanceTotal_A"                            : dataObj['A/R Balance Total (A)'],
          "ArTradeBalance"                              : dataObj['Ar Trade Balance'],
          "NoteReceivableBalance"                       : dataObj['Note Receivable Balance'],
          "Positive_ARBal_B"                            : dataObj['(+) A/R Bal. (B)'],
          "Negative_ARBal_C"                            : dataObj['(-) A/R Bal. (C)'],

          "Avg_ARBal_Based_On_1_Year"                   : dataObj['Avg. A/R Bal. (Based on 1 Year)'], 
          "AverageMinAR_Based_On_1_Year"                : dataObj['Average Min.A/R (Based on 1 Year)'],
          "AverageMaxAR_Based_On_1_Year"                : dataObj['Average Max. A/R (Based on 1 Year)'],
          "AverageOverdu_Positive_Total_Percent_Based_On_1_Year"  : dataObj['Average overdue(+) (Total, %, (Based on 1 Year))'],
          "AverageOverdue_Positive_16_31_Percent_Based_On_1_Year" : dataObj['Average overdue(+) (16~31, %, (Based on 1 Year))'],
          "AverageOverdue_Positive_32_Percent_Based_On_1_Year"    : dataObj['Average overdue(+) (32, %, (Based on 1 Year))'],
          "TotalOverdue_Positive_AR_N"                  : dataObj['Total Overdue(+) A/R (N)'],

          "TotalOverdue_Positive_Percent_NB"            : dataObj['Total Overdue(+) % (N/B)'],
          "VsEndOfLastMonth_TotalOverdue"               : dataObj['Vs. End of Last Month (Total Overdue'],
          "Overdue_1_15_Days_Positive_AR_O"             : dataObj['Overdue1~15 days (+)A/R(O)'],
          "Overdue_1_15_DaysPercent_OB"                 : dataObj['Overdue 1~15 days %(O/B)'], 
          "VsEndOfLastMonth_Overdue_1_15_Days"          : dataObj['Vs. End of Last Month (Overdue 1~15 days'], 

          "Overdue_16_31_Days_Positive_AR_P"            : dataObj['Overdue 16~31 days (+)A/R(P)'],
          "Overdue_16_31_Days_Positive_PB"              : dataObj['Overdue 16~31 days %(P/B)'],
          "VsEndOfLastMonth_Overdue_16_31_Days"         : dataObj['Vs. End of Last Month (Overdue 16~31 days)'],
          "TotalOverdue_32_Days"                        : dataObj['Total Overdue 32days ↑'],

          "Overdue_32_Days_Positive_AR_Q"               : dataObj['Overdue 32 days ↑ (+)A/R(Q)'],
          "Overdue32_Days_Positive_Percent_QB"          : dataObj['Overdue 32 days ↑ (+)% (Q/B)'],
          "VsEndOfLastMonth_Overdue32_Days"             : dataObj['Vs. End of Last Month (Overdue 32 days ↑)'],
          "Overdue_32_Days_Negative_AR"                 : dataObj['Overdue 32 days ↑ (-) A/R'],
          "Overdue_32_Days_Negative_Percent_RC"         : dataObj['Overdue 32 days ↑ (-) %(R/C)'],

          "VsEndOfLastMonth_Overdue_32_Days_Negative"   : dataObj['vs end of last month (overdue 32 days ↑ (-)'],
          "Overdue_32_60_Days_Positive_AR"              : dataObj['Overdue 32~60 Days (+) A/R'],
          "Overdue_61_90_Days_Positive_AR"              : dataObj['Overdue 61~90 Days (+) A/R'],
          "Overdue_91_Days_Positive_AR"                 : dataObj['Overdue 91 Days ↑  (+) A/R'],

          "AR_Sum_Exposure"                             : dataObj['AR+exposure(E=A+F)'],
          "Exposure"                                    : dataObj['Exposure(F)(S/O+D/O+billing+cash paid'], 
          "SalesOrder"                                  : dataObj['Sales order'], 
          "DeliveryOrder"                               : dataObj['Delivery Order'],
          "BillingDoc"                                  : dataObj['Billing Doc'],
          "CashPaid"                                    : dataObj['Cash Paid'],
          "GrossSalesThisMonth"                         : dataObj['Gross Sales This month'],
          "GrosssalesPrevMonth"                         : dataObj['Gross sales (Prev Month'],
          "GrossSalesThisYearTotal"                     : dataObj['Gross Sales this year total'],
          "GrossSalesLatest_1_Year_Total_Exclude_This_Month"  : dataObj['Gross Sales latest 1 year total () exclude this month'], 
          "GrossSalesLatest_1_Year_Rank"                : dataObj['Gross Sales (Latest 1 year rank'], 
          "AvgPaymentTermsThisMonth"                    : dataObj['Avg. Payment terms (this month)'],
          "AR_DaysThisMonth"                            : dataObj['A/R days this month'],

          "AR_DaysVsPrevYear"                           : dataObj['A/R days Vs. Prev. Year'],
          "AR_DaysPrevMonth"                            : dataObj['A/R Days (Prev. Month'],
          "AR_DaysAvgThisYear"                          : dataObj['A/R Days (Avg. this year)'],
          "CreditLimitG"                                : dataObj['Credit Limit (G)'], 
          "CreditExcessRate_Percent_Vs_SCES_Limit"      : dataObj['Credit Excess Rate (%, vs. SCES Limit)'], 
          "CreditExcessAmount_Vs_SCES_Limit"            : dataObj['Credit Excess Amount (vs SCES Limit'],
          "CreditUsageRate_Percent_Vs_AR"               : dataObj['Credit Usage Rate (%, vs. A/R)'],
          "CreditUsageRate_Percent_Vs_AR_Sum_Exposure"  : dataObj['Credit Usage Rate (%, vs. A/R+Exposure)'],
          "OpenLimit"                                   : dataObj['Open Limit'],
          "ExcessRate_Percent_Vs_SCES_Limit"            : dataObj['Excess rate  (%, vs. SCES Limit)'],
          "ExcessAmount_Vs_SCESLimit"                   : dataObj['Excess Amount (vs. SCES Limit)'],
          "HedgingLimitJ"                               : dataObj['hedging Limit (J)'],
          "HedgingUsageRate_Percent_VsAR"               : dataObj['Hedging Usage Rate(%, Vs. A/R'], 

          "HedgingUsageRate_Percent_Vs_AR_Sum_Exposure" : dataObj['Hedging Usage Rate (%,Vs,A/R+exposure'], 
          "HedgeLimitTotalWith_H_Method"                : dataObj['Hedge Limit Total with H. Method'],
          "HedgeLimitLocalInsurance"                    : dataObj['Hedge Limit Local Insurance'],
          "HedgeLimitHQGuarantee"                       : dataObj['Hedge Limit (HQ Guarantee)'],
          "HedgeLimitBankGuarantee"                     : dataObj['Hedge Limit (Bank Guarantee)'],
          "HedgeLimitStandByLC"                         : dataObj['Hedge Limit (Stand By LC)'],
          "HedgeLimitL_CBasis"                          : dataObj['Hedge Limit (L/C Basis)'],
          "HedgeLimitFactoring"                         : dataObj['Hedge Limit (Factoring)'], 
          "HedgeLimitOthersBy_H_Method"                 : dataObj['Hedge Limit (Others By H. Method)'], 
          "HedgeLimitOthers"                            : dataObj['Hedge Limit (Others)'],
          "RiskCovered_AR_M"                            : dataObj['Risk Covered AR (M)'],
          "HedgingRatio_MA_Percent"                     : dataObj['Hedging Ratio (M/A%'], 
          "InsuranceUsageRate_Percent"                  : dataObj['Insurance Usage Rate (%)'], 
       
        }
      )
    });
  }

  else  if(this.masterName.ModuleCode == 'SCE'){
    data.forEach((dataObj: any) => {
      records.Records.push(
        {
          "RegionalHeadquater"             : dataObj['Regional Headquater'],
          "CompanyCode"                    : dataObj['Company Code'],
          "CompanyCodedescription"         : dataObj['Company Code description'],
          "BusinessPartner"                : dataObj['Business Partner'],
          "PartnerName"                    : dataObj['Partner Name'],
          "CustomerCountry"                : dataObj['Customer Country'] ,          

          "ListedCompanySTEP2EvaluationType" :dataObj['Listed Company (STEP2 Evaluation Type)']  , 
          "MainBizCountry1"                : dataObj['Main Biz.Country 1'],
          "MainBizCountry2"                : dataObj['Main Biz.Country 2'],
          "MainBizCountry3"                : dataObj['Main Biz.Country 3'],
          "MainBizCountry4"                : dataObj['Main Biz.Country 4'],
          "MainBizCountry5"                : dataObj['Main Biz.Country 5'],
          "TypeofBiz"                      : dataObj['Type of Biz'],

          "BeginningYearWithSamsung"       : dataObj['Beginning Year With Samsung'],
          "Currency"                       : dataObj['Currency'],
          "CountryCreditRatingSP"          : dataObj['Country Credit Rating (S&P)'],
          "CountryCreditRatingMoody"       : dataObj['Country Credit Rating (Moody)'],
          "CountryCreditRatingFitch"       : dataObj['Country Credit Rating (Fitch)'],
          "ExternalCreditRatingSP"         : dataObj['External Credit Rating (S&P)'],
          "ExternalCreditRatingMoody"      : dataObj['External Credit Rating (Moodys)'],

          "ExternalCreditRatingFitch"      : dataObj['External Credit Rating (Fitch)'],
          "ExternalCreditRatingDB"         : dataObj['External Credit Rating (D&B)'],
          "ExternalCreditRatingCreditreform": dataObj['External Credit Rating (Creditreform)'],
          "ExternalCreditRatingUC"         : dataObj['External Credit Rating (UC)'],
          "ExternalCreditRatingGraydon"    : dataObj['External Credit Rating (Graydon)'],
          "ExternalCreditRatingCerved"     : dataObj['External Credit Rating (Cerved)'],
          "ExternalCreditRatingInforma"    : dataObj['External Credit Rating (Informa)'],

          "ExternalCreditRatingEuler"      : dataObj['External Credit Rating (Euler)'],
          "ExternalCreditRatingAtradius"   : dataObj['External Credit Rating (Atradius)'],
          "ExternalCreditRatingCoface"     : dataObj['External Credit Rating (Coface)'],
          "ExternalCreditRatingSinotrust"  : dataObj['External Credit Rating (Sinotrust)'],
          "ExternalCreditRatingEquinox"    : dataObj['External Credit Rating (Equinox)'],
          "ExternalCreditRatingKsure"      : dataObj['External Credit Rating (Ksure)'],
          "TermsofPaymentKey"              : dataObj['Terms of Payment Key'],
          "TermsofPaymentKeyDescription"   : dataObj['Terms of Payment Key Description'],
          "SCESEvaluationType"             : dataObj['SCES Evaluation Type'],
          "SCESFormula"                    : dataObj['SCES Formula'],
          "SCESCreditRating"               : dataObj['SCES Credit Rating '],

          "SCESAVGCreditRatingRecent1Year" : dataObj['SCES AVG. Credit Rating (Recent 1 Year)'],
          "SCESAVGCreditRating202103"      : dataObj['SCES AVG. Credit Rating (2021.03)'],
          "SCESAVGCreditRating202104"      : dataObj['SCES AVG. Credit Rating (2021.04)'],
          "SCESAVGCreditRating202105"      : dataObj['SCES AVG. Credit Rating (2021.05)'],
          "SCESAVGCreditRating202106"      : dataObj['SCES AVG. Credit Rating (2021.06)'],
          "SCESAVGCreditRating202107"      : dataObj['SCES AVG. Credit Rating (2021.07)'],
          "SCESAVGCreditRating202108"      : dataObj['SCES AVG. Credit Rating (2021.08)'],
          "SCESAVGCreditRating202109"      : dataObj['SCES AVG. Credit Rating (2021.09)'],
          "SCESAVGCreditRating202110"      : dataObj['SCES AVG. Credit Rating (2021.10)'],
          "SCESAVGCreditRating202111"      : dataObj['SCES AVG. Credit Rating (2021.11)'],
          "SCESAVGCreditRating202112"      : dataObj['SCES AVG. Credit Rating (2021.12)'],
          "SCESAVGCreditRating202201"      : dataObj['SCES AVG. Credit Rating (2022.01)'],

          "SCESRatingtrendrecent1yearStandardDeviation" : dataObj['SCES Rating trend (recent 1 year) Standard Deviation'],
          "AvgARBalBasedon1year"           : dataObj['Avg. A/R Bal. (Based on 1 year) '],
          "AverageMinARBasedon1year"       : dataObj['Average Min. A/R (Based on 1 year)'],
          "AverageMAXARBasedon1year"       : dataObj['Average MAX A/R (Based on 1 year)'],
          "AvgoverdueTotalBasedon1Year"    : dataObj['Avg. overdue(+) (Total, %, (Based on 1 Year))'],
          "Avgoverdue1631Basedon1Year"     : dataObj['Avg. overdue(+) (16~31, %, (Based on 1 Year))'],
          "Avgoverdue32Basedon1Year"       : dataObj['Avg. overdue(+) (32, %, (Based on 1 Year))'],
          "ARBalanceTotalA"                : dataObj['A/R Balance Total (A)'],
          "ARBalB"                         : dataObj['(+) A/R Bal. (B)'],
          "ARBalC"                         : dataObj['(-) A/R Bal. (C)'],
          "OverdueTotal"                   : dataObj['Overdue (+) (Total,%)'],
          "overdue1631"                    : dataObj['overdue(+) (16~31, %, )'],

          "overdue32"                      : dataObj['overdue(+) (32, %, )'],
          "HedgingLimit"                   : dataObj['Hedging Limit (A)'],
          "RiskCoveredAR"                  : dataObj['Risk Covered AR'],
          "HedgingRatio"                   : dataObj['Hedging Ratio (%)'],
          "GrossSalesThismonth"            : dataObj['Gross Sales ( This month)'],
          // TEST COLUMN
          "GrossSalesthisyeartotal"        : dataObj['Gross Sales (this year total)'],
          "GrossSalesLatest1yeartotalexcludethismonth": dataObj['Gross Sales Latest 1 year total (exclude this month)'],

          "GrossSalesLatest1YearRank"      :  dataObj['Gross Sales (Latest 1 Year Rank)'],
          "GrossSalesExpectedsalesfornext1yearInhourseinfo"    : dataObj['Gross Sales (Expected sales for next 1 year, Inhourse info.)'],
          "AvgCreditdaysSteps5InhouseInfo" : dataObj['Avg. Credit days(Steps5 In house Info. )'],
          "ARdaysthismonth"                : dataObj['A/R days this month'],
          "ARdaysVPrevYear"                : dataObj['A/R days Vs. Prev. Year'],

          "TotalScore"                     : dataObj['Total Score'],
          "Externalrating"                 : dataObj['External rating'],
          "FinancialStatus"                : dataObj['Financial Status'],
          "Inhouseinformation"             : dataObj['Inhouse information'],
          "QualitativeInformation"         : dataObj['Qualitative Information'],
          "HedgeLimitLocalInsurancw"       : dataObj['Hedge Limit Local Insurance'],
	
          "HedgeLimitHQGuarantee"          : dataObj['Hedge Limit (HQ Guarantee)'],

          "HedgeLimitBankGuarantee"        :  dataObj['Hedge Limit (Bank Guarantee)'],
          "HedgeLimitStandByLC"            : dataObj['Hedge Limit (Stand By LC)'],
          "HedgeLimitBasis"                : dataObj['Hedge Limit (L/C Basis)'],
          "HedgeLimitFactoring"            : dataObj['Hedge Limit (Factoring)'],
          "HedgeLimitOthers"               : dataObj['Hedge Limit (Others)'],
	
          "ARAmountSamsung"                : dataObj['AR Amount (Samsung)'],
          "LCAmount"                       :  dataObj['LC Amount'],


          "NoteReceivables"                : dataObj['Note Receivables'],
          "CashinAdvance"                  : dataObj['Cash in Advance'],
          "CreditLimit"                    : dataObj['Credit Limit (B)'],
          "SCESFormula1"                   : dataObj['SCESFormula1'],
          "SCESCreditLimit"                : dataObj['SCES Credit Limit©'],
	
          "SCESvsHedgELimit"               : dataObj['SCES vs. Hedge Limit (C/A,%)'],
          "SCESvsInsuranceLimit"           :  dataObj['SCES vs. Insurance Limit (%)'],
          "SCESvsCreditLimit"              : dataObj['SCES vs. Credit Limit (C/B,%)'],
          "TotalEquity"                    : dataObj['Total Equity (F/S)'],
         
          "NetCurrentAsset"                : dataObj['Net Current Asset (F/S)'],
          "GrossSalesofLates1year"         : dataObj['Gross Sales of Latest 1 year (Exclude V.A.T & Return)'],
          "MaxARBalofLatest1Year"          : dataObj['Max. A/R Bal. of Latest 1 Year'],
          "DiscountExtraRate"              :  dataObj['Discount/Extra Rate (%)'],
          "CreditDaysRisk"                 : dataObj['Credit Days Risk (Formula 1 Only)'],
        }
      )
    });
  }
  else if(this.masterName.ModuleCode == 'BPR'){
  data.forEach((dataObj: any) => {
    records.Records.push(
      {
        // "BPRelationID"                 : dataObj['BPRelationID'],
        "ParentSegment"                : dataObj['Parent Segment'],
        "ParentSegmentDescription"     : dataObj['Parent Segment Description'],
        "ParentPartner"                : dataObj['Parent Partner'],
        "ParentPartnerName"            : dataObj['Parent Partner Name'],
        "ChildSegment"                 : dataObj['Child Segment'] ,
        "ChildSegmentDescription"      : dataObj['Child Segment Description'],
        "ChildPartner"                 : dataObj['Child Partner'],
        "ChildPartnerName"             : dataObj['Child Partner Name'],  
        "RelationType"                 : dataObj['Relation Type'],
        "RelationTypeDescription"      : dataObj['Relation Type Description'],                  
      }
    )
  });
}
  else if(this.masterName.ModuleCode == 'SHT'){

    data.forEach((dataObj: any) => {
      records.Records.push(
        {
          "SalesHistoryID": dataObj['SalesHistoryID'],
          "CustGroup"     : dataObj['Cust. Group'],
          "SoldTo"        : dataObj['Sold-to'],
          "BillingType"   : dataObj['Billing type'],
          "BillingDate"   : !isNaN(dataObj['Billing Date']) ?  this.ExcelDateToJSDate(dataObj['Billing Date'])     :  dataObj['Billing Date'] ,
          "ItemDiv"       : dataObj['Item Div'],
          "LocNetAmount"  : dataObj['(Loc.) Net Amount'],
          "LocTaxAmount"  : dataObj['(Loc.) Tax Amount'],                    
        }
      )
    });
  }



 else if(this.masterName.ModuleCode == 'CDH'){
    data.forEach((dataObj: any) => {
      records.Records.push(
        {
          "GLAccount"               : dataObj['G/L Account'],
          "Customer"                : dataObj['Customer'],
          "TradingPartnerNo"        : dataObj['Trading Partner No.'],
          "Segment"                 : dataObj['Segment'],
          "BusinessArea"            : dataObj['Business Area'],
          "ProfitCenter"            : dataObj['Profit Center'],
          "CostCenter"              : dataObj['Cost Center'] ,          
          "Assignment"              : dataObj['Assignment']  , 
          "DocumentType"            : dataObj['Document Type'],
          "AmountDocCurr"           : dataObj['Amount Doc. Curr.'],
          "DocumentCurrency"        : dataObj['Document Currency'],
          "AmountLocalCurrency"     : dataObj['Amount in Local Currency']  , 
          "LocalCurrency"           : dataObj['Local Currency'],
          "Text"                    : dataObj['Text'],
          "DocumentDate"            : !isNaN(dataObj['Document Date']) ?  this.ExcelDateToJSDate(dataObj['Document Date'])    :  this.normalizeDate(dataObj['Document Date']) ,
          "PostingDate"             : !isNaN(dataObj['Posting Date'])  ?  this.ExcelDateToJSDate(dataObj['Posting Date'])     :  this.normalizeDate(dataObj['Posting Date'])  , 
          "NetDueDate"              : !isNaN(dataObj['Net Due Date'])  ?  this.ExcelDateToJSDate(dataObj['Net Due Date'])     :  this.normalizeDate(dataObj['Net Due Date'])  ,
          "YearMonth"               : !isNaN(dataObj['Year/Month'])    ?  this.ExcelDateToJSDate(dataObj['Year/Month'])       :  this.normalizeDate(dataObj['Year/Month']),
          "PostingKey"              : dataObj['Posting Key'],
          "DocumentNumber"          : dataObj['Document Number'],
          "FunctionalArea"          : dataObj['Functional Area'],
          "UserName"                : dataObj['User Name']  , 
          "Reference"               : dataObj['Reference'],
          "SamsungDocumentNumber"   : dataObj['Samsung Document Number'],
          "WBSElement"              : dataObj['WBS Element'],
          
        }
      )
    });
  }

  else if(this.masterName.ModuleCode == 'CUM'){
    data.forEach((dataObj: any) => {
      records.Records.push(
        {
          "Customer"                 : dataObj['Customer'],
          "ClerkAbbreviation"        : dataObj['Clerk Abbreviation'],
          "AccountMemo"              : dataObj['Account Memo'],
          "AccClerksTelNo"           : dataObj['Acct.Clerks Tel. No'] ,
          "AccountAtCustomer"        : dataObj['Account at Customer'],
          "UserAtCustomer"           : dataObj['User at Customer'],
          "Name"                     : dataObj['Name'],
          "TaxNumber2"               : dataObj['Tax Number 2'],
          "EmailAddress"             : dataObj['Email Address'],
          "SalesOffice"              : dataObj['Sales Office'],
          "AccountGroup"             : dataObj['Account Group'] ,
          "CustomerGroup"            : dataObj['Customer Group'],
          "PaymentTerms"             : dataObj['Payment Terms'],
                            
        }
      )
    });
  }

  else if(this.masterName.ModuleCode == 'CLD'){
    data.forEach((dataObj: any) => {
      records.Records.push(          {
    "Counter"                      : dataObj["Counter"],
    "BusinessPartner"              : dataObj["Business Partner"],
    "CustomerName"                 : dataObj["Customer Name"],
    "LimitDescription"             : dataObj["Description"],
    "Owner"                        : dataObj["Owner"],
    "No"                           : dataObj["No"],
    "ValidTo"                      : !isNaN(dataObj['Valid To']) ?  this.ExcelDateToJSDate(dataObj['Valid To'])     :   this.normalizeDate(dataObj['Valid To']) ,          
    "ValidFrom"                    : !isNaN(dataObj['Valid-From']) ? this.ExcelDateToJSDate(dataObj['Valid-From'])  :  this.normalizeDate(dataObj['Valid-From'])  ,
    "CreditValidFrom"              :  !isNaN(dataObj['Credit Valid From']) ?  this.ExcelDateToJSDate(dataObj['Credit Valid From'])     :   this.normalizeDate(dataObj['Credit Valid From']) , 
    "CreditValidTo"                :  !isNaN(dataObj['Credit Valid-To']) ? this.ExcelDateToJSDate(dataObj['Credit Valid-To'])  :  this.normalizeDate(dataObj['Credit Valid-To'])  ,
    "Amount"                       : dataObj["Amount"],
    "AccountingClerk"              : dataObj["Accounting Clerk"],
    "NameOfAccountingClerk"        : dataObj["Name of Accounting Clerk"],
    "CreatingDate"                 : !isNaN(dataObj['Creating Date']) ? this.ExcelDateToJSDate(dataObj['Creating Date'])  :  this.normalizeDate(dataObj['Creating Date']),
    "ChangeDate"                   : !isNaN(dataObj['Change Date']) ? this.ExcelDateToJSDate(dataObj['Change Date'])  :  this.normalizeDate(dataObj['Change Date']),
    "CCA"                          : dataObj["CCA"],
    "HedgeId"                      : dataObj["Hedge Id"],
    "RefHedgeId"                   : dataObj["Ref. Hedge Id"],
    "CreditLimit"                  : dataObj["Credit Limit"],
    "CreditExpo"                   : dataObj["Credit Expo"],
    "AvailableAmount"              : dataObj["Available Amount"],
    "HedgedType"                   : dataObj["Hedged Type"],
    "CurrencyDescription"          : dataObj["Description_1"],
    "HedgedMethod"                 : dataObj["Hedged Method"],
    "Currency"                     : dataObj["Currency"],
    "KEICCode"                     : dataObj["KEIC-Code"],
    "HedgeLimit"                   : dataObj["Hedge Limit"],
    "Address"                      : dataObj["Address"],
    "CreditCheckingRule"           : dataObj["Credit Checking Rule"],
    "RiskClass"                    : dataObj["Risk Class"],
    "CreditGroup"                  : dataObj["Credit Group"],
    "DataOrigin"                   : dataObj["Data Origin"],
    "PurposeOfSpecialLimit"        : dataObj["Purpose of Special Limit"],
    "Agency"                       : dataObj["Agency"],
    "AppraisalDate"                : !isNaN(dataObj['Appraisal Date']) ? this.ExcelDateToJSDate(dataObj['Appraisal Date'])  :  this.normalizeDate(dataObj['Appraisal Date']),
    "RequestOrAppraisalAmount"     : dataObj["Request/Appraisal Amount"],
    "Relationship"                 : dataObj["Relationship"],
    "Renter"                       : dataObj["Renter"],
    "HedgeValidFrom"               : dataObj["Hedge Valid From"],
    "HedgeValidTo"                 : dataObj["Hedge Valid to"],
    "PercentOfCover"               : dataObj["% of Cover"],
    "DeductibleAmount"             : dataObj["Deductible Amount"],
    "ExposureCurrency"             : dataObj["Exposure Currency"],
    
}

      )
    });
  }

  
  else if(this.masterName.ModuleCode == 'ARH'){
    debugger
    data.forEach((dataObj: any) => {
      records.Records.push(
        {
          "Clrk"               : dataObj['Clrk'],
          "CusCode"            : dataObj['Cus. Code'],
          "CustomerName"       : dataObj['Customer Name'],
          "BalanceAmt"         : dataObj['Balance Amt'] ,
          "InDueAmt"           : dataObj['In-Due Amt'],
          "OverDueAmt"         : dataObj['Over-Due Amt'],
          "AR_Over_31_Percent" : dataObj['A/R Over 31%'],  
          "OverDuePercent"     : dataObj['Over-Due %'],
          "Positive_1_15_AR"   : dataObj['1~ 15 (+) AR'],
          "Positive_16_31_AR"  : dataObj['16~ 31 (+) AR'],
          "Positive_32_45_AR"  : dataObj['32~45 (+) AR'] ,
          "Positive_46_60_AR"  : dataObj['46~60 (+) AR'],
          "AR_Over_31_Amt"     : dataObj['A/R Over 31 Amt'],
          "Negative_1_15_AR"   : dataObj['1~15 (-) AR'], 
          "Negative_16_31_AR"  : dataObj['16~ 31 (-) AR'],
          "Negative_32_45_AR"  : dataObj['32~45 (-) AR'],
          "Negative_46_60_AR"  : dataObj['46~60 (-) AR'],
          "PositiveARAmt"      : dataObj['(+) A/R Amt'] ,
          "NegativeARAmt"      : dataObj['(-) A/R Amt'],
          "DownPmntAmt"        : dataObj['DownPmnt. Amt'],
          "Over_61_Positive_AR": dataObj['Over 61 (+)AR'],  
          "Over_61_Negative_AR": dataObj['Over 61 (-)AR'],
          // "FileDate"           : this.FileDate
                          
        }
      )
    });
  }


  else  if(this.masterName.ModuleCode == 'WOS'){
    data.forEach((dataObj: any) => {
      records.Records.push(
        {
          // "WOSID"        : dataObj['WOSID'],
          "Country"      : dataObj['Country'],
          "Division"     : dataObj['Division'],
          "WeekYear"     : dataObj['WeekYear'],
          "SoldToCode"   : dataObj['Sold to Code'],
          "WeeklyStockVol" : dataObj['Weekly stock vol'],
          "WOSVol"       : dataObj['WOS Vol'],
             
        }
      )
    });
  }
  

  
else  if(this.masterName.ModuleCode == 'ARR'){
    data.forEach((dataObj: any) => {
      records.Records.push(
        {
          "Customer"        : dataObj['Customer'],
          "Name"            : dataObj['Name'],
          "Segment"         : dataObj['Segment'],
          "AcctgClerk"      : dataObj['Acctg Clerk'],
          "ConfDate"        : !isNaN(dataObj['Conf. Date']) ?  this.ExcelDateToJSDate(dataObj['Conf. Date'])     :  this.normalizeDate(dataObj['Conf. Date']) ,
          "Balance"         : dataObj['Balance'],
          "Plusminus1"      : dataObj['(+/-)'],
          "CustBalance"     : dataObj['Cust. Balance'],
          "Plusminus2"      : dataObj['(+/-)_2'],
          "Difference"      : dataObj['Difference'],
          "Plusminus3"      : dataObj['(+/-)_3'],
          "NetDiff"         : dataObj['Net. Diff'],
          "SubClear"        : dataObj['Sub. Clear'],
          "NDAmountLC1"     : dataObj['ND Amount in LC 1'],
          "NDAmountLC2"     : dataObj['ND Amount in LC 2'] ,          
          "NDAmountLC3"     : dataObj['ND Amount in LC 3']  , 
          "NDAmountLC4"     : dataObj['ND Amount in LC 4'],
          "NDAmountLC5"     : dataObj['ND Amount in LC 5'],
          "NDAmountLC6"     : dataObj['ND Amount in LC 6'],
          "NDAmountLC7"     : dataObj['ND Amount in LC 7'],
          "NDAmountLC8"     : dataObj['ND Amount in LC 8'],
          "NDAmountLC9"     : dataObj['ND Amount in LC 9'],
          "Time"            : dataObj['Time'],
          "TimeChange"      : dataObj['Time of Change'],
          "ReconRcvDate"    : !isNaN(dataObj['Recon. Rcv. Date']) ?  this.ExcelDateToJSDate(dataObj['Recon. Rcv. Date'])     :  this.normalizeDate(dataObj['Recon. Rcv. Date']) ,
          "SCAmountLC1"     : dataObj['SC Amount in LC 1'],
          "SCAmountLC2"     : dataObj['SC Amount in LC 2'],
          "SCAmountLC3"     : dataObj['SC Amount in LC 3'],
          "SCAmountLC4"     : dataObj['SC Amount in LC 4'],
          "SCAmountLC5"     : dataObj['SC Amount in LC 5'],
          "SCAmountLC6"     : dataObj['SC Amount in LC 6'],
          "SCAmountLC7"     : dataObj['SC Amount in LC 7'],
          "SCAmountLC8"     : dataObj['SC Amount in LC 8'],
          "SCAmountLC9"     : dataObj['SC Amount in LC 9'],
          "ItemText1"       : dataObj['Item Text 1'],
          "ItemText2"       : dataObj['Item Text 2'],
          "ItemText3"       : dataObj['Item Text 3'],
          "ItemText4"       : dataObj['Item Text 4'],
          "ItemText5"       : dataObj['Item Text 5'],
          "ItemText6"       : dataObj['Item Text 6'],
          "ItemText7"       : dataObj['Item Text 7'],
          "ItemText8"       : dataObj['Item Text 8'],
          "ItemText9"       : dataObj['Item Text 9'],
          "Delivery"        : dataObj['Delivery'],
          "Payment"         : dataObj['Payment'],
          "SalesReturn"     : dataObj['Sales Return'],
          "Rebate"          : dataObj['Rebate'],
          "PriceProtectioon": dataObj['Price Protection'],
          "CashDiscount"    : dataObj['Cash Discount'],
          "MarketingSupport": dataObj['Marketing Support'],
          "Dispute"         : dataObj['Dispute'],
          "Others"          : dataObj['Others'],
             
        }
      )
    });
  }
 
    this.fileData = records.Records
    // console.log(this.fileData ,this.masterName.ModuleCode, "module code");
}


/**
 * This method used for check date is valid or not 
 * @param input as date
 * @returns return input is date or not
 */
   is_date = (input:any) => {
    //  alert()
      if ( Object.prototype.toString.call(input) === "[object Date]" ) 
      return true;
       return false;   
    };

    /**
     * This method used for convert excel date formate into date 
     * @param date 
     * @returns 
     */
     ExcelDateToJSDate = (date : any) => {
      let converted_date = new Date(Math.round((date - 25569) * 864e5)); 
      debugger;  
      return  this.formatDate(converted_date)
    }
 
    /**
     * This method used date conversion dd/mm/yyyy to mm/dd/yyyy
     * @param today as date
     * @returns date in mm/dd/yyyy
     */
     formatDate(today:any) {
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = today.getFullYear();
           return mm + '/' + dd + '/' + yyyy;
    }

    normalizeDate(input:any) {
      if(input?.length ==9){
      var parts = input.split('/');
      return (parts[0] < 10 ? '0' : '')
        + parseInt(parts[0]) + '/'
        + (parts[1] < 10 ? '0' : '')
        + parseInt(parts[1]) + '/'
        + parseInt(parts[2]);
      } else {
        return input
      }
    }

    
    modelChangeFn(event: any){
      this.deletefile(),
      this.fileDownloadForm.reset()
      this.fileDownloadForm.get('from_date')?.setValue(new Date())
      this.fileDownloadForm.get('To_date')?.setValue(new Date())
    
      
  
    }
}
