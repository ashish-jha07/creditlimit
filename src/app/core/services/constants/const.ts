import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
export enum ApiMethod
{
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE"
}
export enum AuthEndPoints
{
    CHECK_SERVER = "/checkserver/",
    LOGIN = "/auth/token/login/",
  
}
export enum DateFormate{
    DATE_FORMATE                          = 'dd/mm/yyyy',
    DATE_FORMATE_REQUIRED                 = 'dd/mm/yyyy'
}


export enum ApiEndPoints
{   
    // authentication
    CHECK_SERVER                                        = "/checkserver/",
    LOGIN                                               = "Login/LoginUser",
    RaiseRequest_GetSSOUrl                                               = "RaiseRequest/GetSSOUrl",
    // master managment
    // MASTERMANAGEMENT_GETMODULEMASTERDROPDOWN            = "User/GetModuleMasterDropdown",
    // GETROLE_WISE_MODULES                                = "User/GetRoleWiseModules" ,
    ​MASTERMANAGEMENT_UPLOADmASTERS                         = "Upload/UploadMasters",
    ​MASTERMANAGEMENT_DOWNLOADMASTERS                       = "Upload/DownloadMasters",
    ​MASTERMANAGEMENT_UploadExcelMasters                         = "Upload/UploadExcelMasters",
    
    MASTERMANAGEMENT_GETMODULEMASTERDROPDOWN            ="User/GetModuleMasterDropdown",
    GETROLE_WISE_MODULES                                = "User/GetRoleWiseModules",
   
    // Limit managment 
    LIMITMANAGEMENT_UPLOAD_SALES                        ="SalesProjection/UploadSalesProjection",
    LIMITMANAGEMENT_DOWNLOAD_SALES                      ="SalesProjection/DownloadSalesProjection",
    LIMITMANAGEMENT_GET_REGIONES                        ="User/GetRegionsDropdown",
    LIMITMANAGEMENT_RAISEREQUESTDASK                    ="RaiseRequest/GetPartnerDashBoard",
    LIMITMANAGEMENT_GetAddLimitDropdownData                    ="RaiseRequest/GetAddLimitDropdownData",
    LIMITMANAGEMENT_AddUpdateDeleteLimit                    ="RaiseRequest/AddUpdateDeleteLimit",
    LIMITMANAGEMENT_GetRequestLimitData                    ="RaiseRequest/GetRequestLimitData",
    LIMITMANAGEMENT_SUBMIT_REQUEST                     ="RaiseRequest/SubmitRequest",
    LIMITMANAGEMENT_GetAddLimitPopUpData                    ="RaiseRequest/GetAddLimitPopUpData",

    SAPUpload_DownloadSAPUpload                             = "SAPUpload/DownloadSAPUpload",
    LIMITMANAGEMENT_GetLIMITLIST                            ="RaiseRequest/GetLimitList",
    LIMITMANAGEMENT_GetAPPROVERLIST                            ="RaiseRequest/GetApproverLimitList",

    LIMITMANAGEMENT_EmpSearchByUid                         = "RaiseRequest/EmpSearchByUid",
    LIMITMANAGEMENT_ApproverEditLimit                         = "RaiseRequest/ApproverEditLimit"

    
    
    // API deployed on dev server
    
    
    
    
}



/** This snackbarconfig constant collection used for configuration snackbar */
export enum SnackbarConfig
{   
    // Message
    MESSAGE_UPLOAD_EXCELFILE_NOT_VALID  = 'Invalid file type. Kindly select excel file to upload the data.',
    MESSAGE_UPLOAD_EXCELFILE_EMPTY      = 'The selected file is not containing data to upload.',
    // ACTIONS
    ACTION_RETRY                        = 'Retry',
    ACTION_UNDO                         = 'Undo',
    
    // DISPLAY TIME DURATION
    TIME_TwO_SECOND                     = 2000,
    TIME_THREE_SECOND                   = 3000,
    TIME_FOUR_SECOND                    = 5000,
}


/**
 * This service used for excel file download in master management
 */
@Injectable({
    providedIn: 'root',
})


export class ExcelDownloadKitConfig {
    // excel file headers 
    public readonly  AR_HISTORY_HEADER_ARRAY_Download                        : Array<String> = ['Clrk', 'Cus. Code', 'Customer Name', 'Balance Amt', 'In-Due Amt', 'Over-Due Amt', 'Over-Due %', '1~ 15 (+) AR', '16~ 31 (+) AR', '32~45 (+) AR', '46~60 (+) AR', 'A/R Over 31 Amt', 'A/R Over 31%', '1~15 (-) AR', '16~ 31 (-) AR', '32~45 (-) AR', '46~60 (-) AR', '(+) A/R Amt', '(-) A/R Amt', 'DownPmnt. Amt', 'Over 61 (+)AR', 'Over 61 (-)AR', 'Created On']

    public readonly  AR_HISTORY_HEADER_ARRAY                        : Array<String> = ['Clrk', 'Cus. Code', 'Customer Name', 'Balance Amt', 'In-Due Amt', 'Over-Due Amt', 'Over-Due %', '1~ 15 (+) AR', '16~ 31 (+) AR', '32~45 (+) AR', '46~60 (+) AR', 'A/R Over 31 Amt', 'A/R Over 31%', '1~15 (-) AR', '16~ 31 (-) AR', '32~45 (-) AR', '46~60 (-) AR', '(+) A/R Amt', '(-) A/R Amt', 'DownPmnt. Amt', 'Over 61 (+)AR', 'Over 61 (-)AR']
   public readonly  CASH_DISCOUNT_HEADER_ARRAY                     : Array<String> = [ 'CnTy','Tab', 'SOrg','Dv','Customer','PayT','ReSt','Valid From','Valid To','Amount' ,'Unit','Per', 'UoM']
   public readonly  SELL_OUT_HEADER_ARRAY                          : Array<string> = [ 'Country', 'Division', 'PartnerType', 'Month', 'Year', 'SellerCode', 'P2', 'SalesType', 'Vol', 'Value']
   public readonly  WOS_HEADER_ARRAY                               : Array<string> = ['Country', 'Division', 'WeekYear', 'Sold to Code', 'Weekly stock vol', 'WOS Vol'] 
   public readonly  WOS_HEADER_ARRAY_download                      : Array<string> = ['Country', 'Division', 'WeekYear', 'Sold to Code', 'Weekly stock vol', 'WOS Vol'] 

   public readonly  SALE_HISTORY_HEADER_ARRAY                      : Array<string> = ['SalesHistoryID','Cust. Group', 'Sold-to', 'Billing type', 'Billing Date', 'Item Div', '(Loc.) Net Amount', '(Loc.) Tax Amount']
//    Sales Office
   public readonly  CUSTOMER_MASTER_HEADER_ARRAY                   : Array<String> = ['Customer', 'Clerk Abbreviation', 'Account Memo', 'Acct.Clerks Tel. No', 'Account at Customer',  'User at Customer', 'Name', 'Tax Number 2', 'Email Address', 'Sales Office', 'Account Group', 'Customer Group', 'Payment Terms']
//    public readonly  CHEQUE_DISHNOUR_HEADER_ARRAY                   : Array<String> = ['Year/Month', 'Customer', 'Name', 'BizDiv', 'Segment', 'BP', 'Assignment', 'Document Date', 'Document Number', 'Typ', 'Amount in Local Currency', 'Text']
  public readonly  CHEQUE_DISHNOUR_HEADER_ARRAY                   : Array<String> = ['G/L Account','Customer','Trading Partner No.','Segment','Business Area','Profit Center','Cost Center','Assignment','Document Type','Amount Doc. Curr.','Document Currency','Amount in Local Currency','Local Currency','Text','Document Date','Posting Date','Net Due Date','Year/Month','Posting Key','Document Number','Functional Area','User Name','Reference','Samsung Document Number','WBS Element']
   
public readonly  BP_RELATION_HEADER_ARRAY                       : Array<String> = [ 'Parent Segment' ,'Parent Segment Description', 'Parent Partner', 'Parent Partner Name', 'Child Segment','Child Segment Description','Child Partner','Child Partner Name','Relation Type','Relation Type Description']
//    public readonly  AR_RECONSILATION_HEADER_ARRAY                  : Array<String> = ['Customer' ,'ConfDate', 'Difference', 'PlusMinus', 'SubClear','Time','ChangedOn','TimeOfChange','NetDifference']
   public readonly  AR_RECONSILATION_HEADER_ARRAY                  : Array<String> = ['Customer' ,'Name', 'Segment', 'Acctg Clerk', 'Conf. Date','Balance','(+/-)','Cust. Balance','(+/-)_2', 'Difference', '(+/-)_3','Net. Diff', 'Sub. Clear', 'ND Amount in LC 1', 'ND Amount in LC 2', 'ND Amount in LC 3', 'ND Amount in LC 4','ND Amount in LC 5','ND Amount in LC 6','ND Amount in LC 7','ND Amount in LC 8','ND Amount in LC 9','Created By','Created on','Time','Changed By','Changed On','Time of Change','Recon. Rcv. Date','SC Amount in LC 1','SC Amount in LC 2','SC Amount in LC 3','SC Amount in LC 4','SC Amount in LC 5','SC Amount in LC 6','SC Amount in LC 7','SC Amount in LC 8','SC Amount in LC 9','Item Text 1','Item Text 2','Item Text 3','Item Text 4','Item Text 5', 'Item Text 6','Item Text 7','Item Text 8','Item Text 9','Delivery','Payment','Sales Return','Rebate','Price Protection','Cash Discount','Marketing Support','Dispute','Others']
//    public readonly  AR_HISTORY_HEADER_ARRAY                        : Array<String> = ['Clrk', 'Cus. Code', 'Customer Name', 'Balance Amt', 'In-Due Amt ', 'Over-Due Amt', 'Over-Due %', '1~ 15 (+) AR', '16~ 31 (+) AR', '32~45 (+) AR', '46~60 (+) AR', 'A/R Over 31 Amt', 'A/R Over 31%', '1~15 (-) AR', '16~ 31 (-) AR', '32~45 (-) AR', '46~60 (-) AR', '(+) A/R Amt ', '(-) A/R Amt ', 'DownPmnt. Amt ', 'Over 61 (+)AR', 'Over 61 (-)AR']
//    public readonly  CASH_DISCOUNT_HEADER_ARRAY                     : Array<String> = [ 'CnTy','Tab' , 'SOrg', 'Dv', 'Customer' ,'PayT','ReSt', 'Valid From', 'Valid To', 'Amount' , 'Unit' , 'Per', 'UoM']
   public readonly  SALES_PROJECTION_HEADER_ARRAY                  : Array<String> = ['CustomerCode', 'CustomerName', 'Branch', 'Region', 'ProjectionYear', 'ProjectionMonth', 'CurrentYearProjectionAmount', 'LastYearProjectionAmount']
   public readonly  SALES_PROJECTION_HEADER_ARRAY_KEY                 : Array<String> = ['Customer Code', 'Customer Name', 'Branch', 'Region', 'Projection Year', 'Projection Month', 'Projection Amount']

//    public readonly  CREDIT_LIMIT_DATA_HEADER_ARRAY                 : Array<String> = ['Customer','BusinessPartner','CustomerName','LimitDescription','Owner','No','Valid From','Valid To','Amount' ,'AccountingClerk','NameOfAccountingClerk', 'CreatingDate',   'ChangeDate' ,'CCA','HedgeId', 'RefHedgeId', 'CreditLimit', 'CreditExpo', 'AvailableAmount', 'HedgedType', 'CurrencyDescription', 'HedgedMethod', 'Currency', 'KEICCode', 'HedgeLimit', 'Address', 'CreditCheckingRule', 'RiskClass', 'CreditGroup', 'DataOrigin','PurposeOfSpecialLimit', 'Agency', 'AppraisalDate', 'RequestOrAppraisalAmount','Relationship', 'Renter', 'HedgeValidFrom','HedgeValidTo','PercentOfCover','DeductibleAmount', 'ExposureCurrency'  ]
   public readonly  CREDIT_LIMIT_DATA_HEADER_ARRAY                 : Array<String>   = ['Counter', 'Business Partner', 'Customer Name', 'Description', 'Owner', 'No', 'Valid-From', 'Credit Valid From', 'Valid To', 'Credit Valid-To','Amount','Accounting Clerk', 'Name of Accounting Clerk','Creating Date', 'Change Date', 'CCA', 'Hedge Id', 'Ref. Hedge Id', 'Credit Limit', 'Credit Expo', 'Available Amount', 'Hedged Type', 'Description_1', 'Hedged Method', 'Currency', 'KEIC-Code','Hedge Limit','Address', 'Credit Checking Rule', 'Risk Class', 'Credit Group','Data Origin', 'Purpose of Special Limit', 'Agency', 'Appraisal Date', 'Request/Appraisal Amount', 'Relationship', 'Renter', 'Hedge Valid From', 'Hedge Valid to', '% of Cover', 'Deductible Amount', 'Exposure Currency']  
   public readonly  PARTNER_INVESTMENT_HEADER_ARRAY                : Array<String> = ['MarketOSResponseID', 'MarketOSWeekMasterID', 'SoldtoCOde', 'MarketOSAgeingMasterID','MarketOSValue','WeekStartDate','WeekEnd Date']

   public readonly  CHECK_RULE_HEADER_ARRAY                : Array<String> = ['Business Partner','Description','Credit Limit','Credit Exposure','C/L Available Amount','C/L excess Amount','Utilization %','Days in Arrears','Risk Class','Credit Check Rule','Sales','Status %','Blocked in Credit Management','DSO','Clerk Abbreviation','Name of Accounting Clerk','Max. open Limit ','Reason for block in Credit Management']

   public readonly  CHANEL_FINANACE_HEADER_ARRAY                : Array<String> = ['CF Bank','Account Number','Customer Name','Customer Code','Total Limit','Limit Validity','Limit Type']
   public readonly  INSURANCE_MASTER_HEADER_ARRAY                : Array<String> = ['Insurance Company','Limit Type','Insurance Code','Customer Name','Customer Code','Limit Amount','Hedge Validity From','Hedge Validity To','Rating','CE Limit','Mobile Limit','Service Limit','SAARC','Hedge Key','Hedge Method','% Cover']



   public readonly SCESE_VALUATION_HEADER_ARRAY :Array<string> = [ 'Regional Headquater', 'Company Code','Company Code description' ,'Business Partner','Partner Name','Customer Country','Listed Company (STEP2 Evaluation Type)','Main Biz.Country 1','Main Biz.Country 2','Main Biz.Country 3','Main Biz.Country 4','Main Biz.Country 5','Type of Biz','Beginning Year With Samsung','Currency','Country Credit Rating (S&P)','Country Credit Rating (Moody)','Country Credit Rating (Fitch)','External Credit Rating (S&P)','External Credit Rating (Moodys)','External Credit Rating (Fitch)','External Credit Rating (D&B)','External Credit Rating (Creditreform)','External Credit Rating (UC)','External Credit Rating (Graydon)','External Credit Rating (Cerved)','External Credit Rating (Informa)','External Credit Rating (Euler)','External Credit Rating (Atradius)','External Credit Rating (Coface)','External Credit Rating (Sinotrust)','External Credit Rating (Equinox)','External Credit Rating (Ksure)','Terms of Payment Key','Terms of Payment Key Description','SCES Evaluation Type','SCES Formula','SCES Credit Rating ','SCES AVG. Credit Rating (Recent 1 Year)','SCES AVG. Credit Rating (2021.03)','SCES AVG. Credit Rating (2021.04)','SCES AVG. Credit Rating (2021.05)','SCES AVG. Credit Rating (2021.06)','SCES AVG. Credit Rating (2021.07)','SCES AVG. Credit Rating (2021.08)','SCES AVG. Credit Rating (2021.09)','SCES AVG. Credit Rating (2021.10)','SCES AVG. Credit Rating (2021.11)','SCES AVG. Credit Rating (2021.12)','SCES AVG. Credit Rating (2022.01)','SCES Rating trend (recent 1 year) Standard Deviation','Avg. A/R Bal. (Based on 1 year) ','Average Min. A/R (Based on 1 year)','Average MAX A/R (Based on 1 year)','Avg. overdue(+) (Total, %, (Based on 1 Year))','Avg. overdue(+) (16~31, %, (Based on 1 Year))','Avg. overdue(+) (32, %, (Based on 1 Year))','A/R Balance Total (A)','(+) A/R Bal. (B)','(-) A/R Bal. (C)','Overdue (+) (Total,%)','overdue(+) (16~31, %, )','overdue(+) (32, %, )','Hedging Limit (A)','Risk Covered AR','Hedging Ratio (%)','Gross Sales ( This month)','Gross Sales (this year total)','Gross Sales Latest 1 year total (exclude this month)'
   ,'Gross Sales (Latest 1 Year Rank)','Gross Sales (Expected sales for next 1 year, Inhourse info.)','Avg. Credit days(Steps5 In house Info. )','A/R days this month','A/R days Vs. Prev. Year','Total Score','External rating','Financial Status','Inhouse information','Qualitative Information','Hedge Limit Local Insurance','Hedge Limit (HQ Guarantee)','Hedge Limit (Bank Guarantee)','Hedge Limit (Stand By LC)','Hedge Limit (L/C Basis)','Hedge Limit (Factoring)','Hedge Limit (Others)','AR Amount (Samsung)','LC Amount','Note Receivables','Cash in Advance','Credit Limit (B)','SCESFormula1','SCES Credit Limit©','SCES vs. Hedge Limit (C/A,%)','SCES vs. Insurance Limit (%)','SCES vs. Credit Limit (C/B,%)','Total Equity (F/S)','Net Current Asset (F/S)','Gross Sales of Latest 1 year (Exclude V.A.T & Return)','Max. A/R Bal. of Latest 1 Year','Discount/Extra Rate (%)','Credit Days Risk (Formula 1 Only)' ]


   public readonly SCESE_FINANCIAL_HEADER_ARRAY : Array<string> = ['Regional Headquater','Company code','Company code description','Business Area','Business Area Descrption','Business Partner','Partner Name',
   'Currency','AVG. Credit Rating','SCES Credit Rating','SCES Credit Grade','SCES Credit Grade Description','SCES Credit Limit','SCES vs Hedge Limit (%)','SCES vs Insurance Limit (%)','SCES vs Credit  Limit (%)','A/R Balance Total (A)','Ar Trade Balance','Note Receivable Balance','(+) A/R Bal. (B)','(-) A/R Bal. (C)',
   'Avg. A/R Bal. (Based on 1 Year)','Average Min.A/R (Based on 1 Year)','Average Max. A/R (Based on 1 Year)','Average overdue(+) (Total, %, (Based on 1 Year))','Average overdue(+) (16~31, %, (Based on 1 Year))','Average overdue(+) (32, %, (Based on 1 Year))','Total Overdue(+) A/R (N)',
   'Total Overdue(+) % (N/B)','Vs. End of Last Month (Total Overdue','Overdue1~15 days (+)A/R(O)','Overdue 1~15 days %(O/B)','Vs. End of Last Month (Overdue 1~15 days','Overdue 16~31 days (+)A/R(P)','Overdue 16~31 days %(P/B)','Vs. End of Last Month (Overdue 16~31 days)','Total Overdue 32days ↑',
   'Overdue 32 days ↑ (+)A/R(Q)','Overdue 32 days ↑ (+)% (Q/B)','Vs. End of Last Month (Overdue 32 days ↑)','Overdue 32 days ↑ (-) A/R','Overdue 32 days ↑ (-) %(R/C)',
   'vs end of last month (overdue 32 days ↑ (-)','Overdue 32~60 Days (+) A/R','Overdue 61~90 Days (+) A/R','Overdue 91 Days ↑  (+) A/R',
   'AR+exposure(E=A+F)','Exposure(F)(S/O+D/O+billing+cash paid','Sales order','Delivery Order','Billing Doc','Cash Paid','Gross Sales This month','Gross sales (Prev Month','Gross Sales this year total','Gross Sales latest 1 year total () exclude this month','Gross Sales (Latest 1 year rank','Avg. Payment terms (this month)','A/R days this month',
    'A/R days Vs. Prev. Year','A/R Days (Prev. Month','A/R Days (Avg. this year)','Credit Limit (G)','Credit Excess Rate (%, vs. SCES Limit)','Credit Excess Amount (vs SCES Limit','Credit Usage Rate (%, vs. A/R)','Credit Usage Rate (%, vs. A/R+Exposure)','Open Limit','Excess rate  (%, vs. SCES Limit)','Excess Amount (vs. SCES Limit)','hedging Limit (J)','Hedging Usage Rate(%, Vs. A/R',
   'Hedging Usage Rate (%,Vs,A/R+exposure','Hedge Limit Total with H. Method','Hedge Limit Local Insurance','Hedge Limit (HQ Guarantee)','Hedge Limit (Bank Guarantee)','Hedge Limit (Stand By LC)','Hedge Limit (L/C Basis)','Hedge Limit (Factoring)','Hedge Limit (Others By H. Method)','Hedge Limit (Others)',
   'Risk Covered AR (M)','Hedging Ratio (M/A%','Insurance Usage Rate (%)']
   //   unknown header ['Regional Headquater', 'Company Code', 'Company Code description ', 'Business Area', 'Business Area Description', 'Business Partner ', 'Partner Name', 'Currency', 'AVG. Credit Rating', 'SCES Credit Rating', 'SCES Credit Grade', 'SCES Credit Grade Description', 'SCES Credit Limit', 'SCES Vs Hedge Limit (%)', 'SCES Vs Insurance Limit (%)', 'SCES Vs Credit Limit (%)', 'A/R Balance Total (A)', 'AR Trade Balance', 'Note Receivable Balance', '(+) A/R Bal.(B)', '(-) A/R Bal.(C)', 'Avg. A/R Bal. (Based on 1 Year)', 'Avg.  Min A/R Bal. (Based on 1 Year)', 'Avg.  Max A/R Bal. (Based on 1 Year)', 'Avg.overdue(+) (Total,%, (based on 1 year)', 'Avg.overdue(+) (16~31, %, (based on 1 year)', 'Avg.overdue(+) (32, %, (based on 1 year)', 'Total OverDue (+)A/R (N)', '__EMPTY']
//   file names


   public readonly  UPLOADEXCEL_DOWNLOADKIT_FILENAME_CASH_DISCOUNT : String        = 'Cash_Discount'
   public readonly  DOWNLOADKIT_FILENAME_AR_HISTORY                : String        = 'Ar_History'
   public readonly  DOWNLOADKIT_FILENAME_CDH                       : String        = 'Cheque_Dishonour_History'
   public readonly  DOWNLOADKIT_FILENAME_SHT                       : String        = 'Sales_History'
   public readonly  DOWNLOADKIT_FILENAME_SCE                       : String        = 'SCES_Evaluation'
   public readonly  DOWNLOADKIT_FILENAME_SCS                       : String        = 'SCES_Over_All_Status_By_Customer'
   public readonly  DOWNLOADKIT_FILENAME_WOS                       : String        = 'WOS'
   public readonly  DOWNLOADKIT_FILENAME_SEO                       : String        = 'Sell-out'
   public readonly  DOWNLOADKIT_FILENAME_CLD                       : String        = 'Credit_Limit_Data'
   public readonly  DOWNLOADKIT_FILENAME_PIM                       : String        = 'Partner_Investment'
   public readonly  DOWNLOADKIT_FILENAME_ARR                       : String        = 'AR_Reconsilation'
   public readonly  DOWNLOADKIT_FILENAME_BPR                       : String        = 'BP_Relation'
   public readonly  DOWNLOADKIT_FILENAME_CUM                       : String        = 'Customer_master'
   public readonly  DOWNLOADKIT_FILENAME_CFN                       : String        = 'Channel_Finance'
   public readonly  DOWNLOADKIT_FILENAME_INS                       : String        = 'Insurance'
   public readonly  DOWNLOADKIT_FILENAME_CHR                       : String        = 'Check_rule'


// }

//    public readonly  SALES_PROJECTION_HEADER_ARRAY                  : Array<String> = ['Customer Code', 'Customer Name', 'Branch', 'Region', 'Year', 'Month', 'Amount', 'Projection By', 'Projection Updated', 'Sales Typ']
   public readonly  DOWNLOADKIT_FILENAME_SALES_PROJECTION          : String        = 'Sales_Projection'
}
