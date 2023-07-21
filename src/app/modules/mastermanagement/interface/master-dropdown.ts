export interface MasterDropdown {
    ID        : Number
    ModuleCode: string
    ModuleName: string
}


export interface ResponseGetModuleMasterDropdown {
    IsSucsess : boolean;
    Message   : string;
    StatusCode: number;
    Response  : MasterDropdown[]
}

export interface RequestGetModuleMasterDropdown {
    RoleCode : string;
}




export class CashDiscount { 
    "CnTy"     : any;
    "Tab"      : any;
    "SOrg"     : any;
    "Dv"       : any;
    "Customer" : any;
    "PayT"     : any;
    "ReSt"     : any;
    "ValidTo"  : any;        
    "ValidFrom": any;   
    "Amount"   : any;
    "Unit"     : any;
    "Per"      : any;
    "UoM"      : any;
    "ModifiedDate": any;
}

export class cfn {
    CFBank			:any;		   
    AccountNumber	:any;		   
    CustomerName	:any;		   
    CustomerCode    :any;	   
    TotalLimit	    :any;  
    LimitValidity   :any;
    LimitType       :any;
}

export class ins {
    InsuranceCompany     :any;
    LimitType			 :any;
    InsuranceCode		 :any;
    CustomerName		 :any;
    CustomerCode		 :any;
    LimitAmount			 :any;
    HedgeValidityFrom	 :any;
    HedgeValidityTo		 :any;
    Rating				 :any;
    CELimit				 :any;
    MobileLimit			 :any;
    ServiceLimit		 :any;
    SAARC				 :any;
    HedgeKey			 :any;
    HedgeMethod			 :any;
    PercentCover		 :any;
}


export class pim {
    "SoldtoCOde"             : any;
    "MarketOSResponseID"     : any;
    "MarketOSWeekMasterID"   : any;
    "MarketOSAgeingMasterID" : any;
    "MarketOSValue"          : any;
    "WeekStartDate"          : any;      
    "WeekEndDate"            : any;
}


export class ARReconsilation {
    Customer                   : any; 
	Name                       : any; 
	Segment                    : any; 
	AcctgClerk                 : any; 
	ConfDate                   : any; 
	Balance                    : any; 
	Plusminus1                 : any; 
	CustBalance                : any; 
	Plusminus2                 : any; 
	Difference                 : any; 
	Plusminus3                 : any; 
	NetDiff                    : any; 
	SubClear                   : any; 
	NDAmountLC1                : any; 
	NDAmountLC2                : any; 
	NDAmountLC3                : any; 
	NDAmountLC4                : any; 
	NDAmountLC5                : any; 
	NDAmountLC6                : any; 
	NDAmountLC7                : any; 
	NDAmountLC8                : any; 
	NDAmountLC9                : any; 
	time                       : any; 
	TimeChange                 : any; 
	ReconRcvDate               : any; 
	SCAmountLC1                : any; 
	SCAmountLC2                : any; 
	SCAmountLC3                : any; 
	SCAmountLC4                : any; 
	SCAmountLC5                : any; 
	SCAmountLC6                : any; 
	SCAmountLC7                : any; 
	SCAmountLC8                : any; 
	SCAmountLC9                : any; 
	ItemText1                  : any; 
	ItemText2                  : any; 
	ItemText3                  : any; 
	ItemText4                  : any; 
	ItemText5                  : any; 
	ItemText6                  : any; 
	ItemText7                  : any; 
	ItemText8                  : any; 
	ItemText9                  : any; 
	Delivery                   : any; 
	Payment                    : any; 
	SalesReturn                : any; 
	Rebate                     : any; 
	PriceProtectioon           : any; 
	CashDiscount               : any; 
	MarketingSupport           : any; 
	Dispute                    : any; 
	Others                     : any; 
}



export class SCESFinancialStatement

{
    RegionalHeadquater       : any ; 
	CompanyCode              : any ; 
	CompanyCodeDescription   : any ; 
	BusinessArea             : any ; 
	BusinessAreaDescrption   : any ; 
	BusinessPartner          : any ; 
	PartnerName              : any ; 
	Currency                 : any ; 
	AVGCreditRating          : any ; 
	SCESCreditRating         : any ; 
	SCESCreditGrade          : any ; 
	SCESCreditGradeDescription : any ; 
	SCESCreditLimit          : any ; 
	SCES_VS_HedgeLimit_Percent  : any ; 
	SCES_VS_InsuranceLimit_Percent  : any ; 
	SCES_VS_CreditLimit_Percent  : any ; 
	ARBalanceTotal_A         : any ; 
	ArTradeBalance           : any ; 
	NoteReceivableBalance    : any ; 
	Positive_ARBal_B         : any ; 
	Negative_ARBal_C  : any ; 
	Avg_ARBal_Based_On_1_Year  : any ; 
	AverageMinAR_Based_On_1_Year  : any ; 
	AverageMaxAR_Based_On_1_Year  : any ; 
	AverageOverdu_Positive_Total_Percent_Based_On_1_Year  : any ; 
	AverageOverdue_Positive_16_31_Percent_Based_On_1_Year  : any ; 
	AverageOverdue_Positive_32_Percent_Based_On_1_Year  : any ; 
	TotalOverdue_Positive_AR_N  : any ; 
	TotalOverdue_Positive_Percent_NB  : any ; 
	VsEndOfLastMonth_TotalOverdue  : any ; 
	Overdue_1_15_Days_Positive_AR_O  : any ; 
	Overdue_1_15_DaysPercent_OB  : any ; 
	VsEndOfLastMonth_Overdue_1_15_Days  : any ; 
	Overdue_16_31_Days_Positive_AR_P  : any ; 
	Overdue_16_31_Days_Positive_PB  : any ; 
	VsEndOfLastMonth_Overdue_16_31_Days  : any ; 
	TotalOverdue_32_Days  : any ; 
	Overdue_32_Days_Positive_AR_Q  : any ; 
	Overdue32_Days_Positive_Percent_QB  : any ; 
	VsEndOfLastMonth_Overdue32_Days  : any ; 
	Overdue_32_Days_Negative_AR  : any ; 
	Overdue_32_Days_Negative_Percent_RC  : any ; 
	VsEndOfLastMonth_Overdue_32_Days_Negative  : any ; 
	Overdue_32_60_Days_Positive_AR  : any ; 
	Overdue_61_90_Days_Positive_AR  : any ; 
	Overdue_91_Days_Positive_AR  : any ; 
	AR_Sum_Exposure  : any ; 
	Exposure  : any ; 
	SalesOrder  : any ; 
	DeliveryOrder  : any ; 
	BillingDoc  : any ; 
	CashPaid  : any ; 
	GrossSalesThisMonth  : any ; 
	GrosssalesPrevMonth  : any ; 
	GrossSalesThisYearTotal  : any ; 
	GrossSalesLatest_1_Year_Total_Exclude_This_Month  : any ; 
	GrossSalesLatest_1_Year_Rank  : any ; 
	AvgPaymentTermsThisMonth  : any ; 
	AR_DaysThisMonth  : any ; 
	AR_DaysVsPrevYear  : any ; 
	AR_DaysPrevMonth  : any ; 
	AR_DaysAvgThisYear  : any ; 
	CreditLimitG  : any ; 
	CreditExcessRate_Percent_Vs_SCES_Limit  : any ; 
	CreditExcessAmount_Vs_SCES_Limit  : any ; 
	CreditUsageRate_Percent_Vs_AR  : any ; 
	CreditUsageRate_Percent_Vs_AR_Sum_Exposure  : any ; 
	OpenLimit  : any ; 
	ExcessRate_Percent_Vs_SCES_Limit  : any ; 
	ExcessAmount_Vs_SCESLimit  : any ; 
	HedgingLimitJ  : any ; 
	HedgingUsageRate_Percent_VsAR  : any ; 
	HedgingUsageRate_Percent_Vs_AR_Sum_Exposure  : any ; 
	HedgeLimitTotalWith_H_Method  : any ; 
	HedgeLimitLocalInsurance  : any ; 
	HedgeLimitHQGuarantee  : any ; 
	HedgeLimitBankGuarantee  : any ; 
	HedgeLimitStandByLC  : any ; 
	HedgeLimitL_CBasis  : any ; 
	HedgeLimitFactoring  : any ; 
	HedgeLimitOthersBy_H_Method  : any ; 
	HedgeLimitOthers  : any ; 
	RiskCovered_AR_M  : any ; 
	HedgingRatio_MA_Percent  : any ; 
	InsuranceUsageRate_Percent  : any ; 
}


export class SCESEvalution {
    RegionalHeadquater : any;
	CompanyCode : any;
	CompanyCodedescription : any; 
	BusinessPartner : any;
	PartnerName : any;
	CustomerCountry : any;
	ListedCompanySTEP2EvaluationType: any; 
	MainBizCountry1 : any;
	MainBizCountry2 : any;
	MainBizCountry3 : any;
	MainBizCountry4 : any;
	MainBizCountry5 : any;
	TypeofBiz : any;
	BeginningYearWithSamsung : any; 
	Currency : any;
	CountryCreditRatingSP : any;
	CountryCreditRatingMoody   : any ;
	CountryCreditRatingFitch   : any ;
	ExternalCreditRatingSP   : any ;
	ExternalCreditRatingMoody   : any ;
	ExternalCreditRatingFitch   : any ;
	ExternalCreditRatingDB   : any ;
	ExternalCreditRatingCreditreform   : any ;
	ExternalCreditRatingUC   : any ;
	ExternalCreditRatingGraydon   : any ;
	ExternalCreditRatingCerved   : any ;
	ExternalCreditRatingInforma   : any ;
	ExternalCreditRatingEuler   : any ;
	ExternalCreditRatingAtradius   : any ;
	ExternalCreditRatingCoface   : any ;
	ExternalCreditRatingSinotrust   : any ;
	ExternalCreditRatingEquinox   : any ;
	ExternalCreditRatingKsure   : any ;
	TermsofPaymentKey : any;
	TermsofPaymentKeyDescription : any; 
	SCESEvaluationType : any;
	SCESFormula : any;
	SCESCreditRating   : any ;
	SCESAVGCreditRatingRecent1Year   : any ;
	SCESAVGCreditRating202103   : any ;
	SCESAVGCreditRating202104   : any ;
	SCESAVGCreditRating202105   : any ;
	SCESAVGCreditRating202106   : any ;
	SCESAVGCreditRating202107   : any ;
	SCESAVGCreditRating202108   : any ;
	SCESAVGCreditRating202109   : any ;
	SCESAVGCreditRating202110   : any ;
	SCESAVGCreditRating202111   : any ;
	SCESAVGCreditRating202112   : any ;
	SCESAVGCreditRating202201   : any ;
	SCESRatingtrendrecent1yearStandardDeviation   : any ;
	AvgARBalBasedon1year   : any ;
	AverageMinARBasedon1year   : any ;
	AverageMAXARBasedon1year   : any ;
	AvgoverdueTotalBasedon1Year   : any ;
	Avgoverdue1631Basedon1Year   : any ;
	Avgoverdue32Basedon1Year   : any ;
	ARBalanceTotalA   : any ;
	ARBalB   : any ;
	ARBalC   : any ;
	OverdueTotal   : any ;
	overdue1631   : any ;
	overdue32   : any ;
	HedgingLimit   : any ;
	RiskCoveredAR   : any ;
	HedgingRatio   : any ;
	GrossSalesThismonth   : any ;
	GrossSalesthisyeartotal   : any ;
	GrossSalesLatest1yeartotalexcludethismonth   : any ;
	GrossSalesLatest1YearRank   : any ;
	GrossSalesExpectedsalesfornext1yearInhourseinfo   : any ;
	AvgCreditdaysSteps5InhouseInfo   : any ;
	ARdaysthismonth   : any ;
	ARdaysVPrevYear   : any ;
	TotalScore   : any ;
	Externalrating   : any ;
	FinancialStatus   : any ;
	Inhouseinformation   : any ;
	QualitativeInformation   : any ;
	HedgeLimitLocalInsurancw   : any ;
	HedgeLimitHQGuarantee   : any ;
	HedgeLimitBankGuarantee   : any ;
	HedgeLimitStandByLC   : any ;
	HedgeLimitBasis   : any ;
	HedgeLimitFactoring   : any ;
	HedgeLimitOthers   : any ;
	ARAmountSamsung   : any ;
	LCAmount   : any ;
	NoteReceivables   : any ;
	CashinAdvance   : any ;
	CreditLimit   : any ;
	SCESCreditLimit   : any ;
	SCESvsHedgELimit   : any ;
	SCESvsInsuranceLimit   : any ;
	SCESvsCreditLimit   : any ;
	TotalEquity   : any ;
	NetCurrentAsset   : any ;
	GrossSalesofLates1year   : any ;
	MaxARBalofLatest1Year   : any ;
	DiscountExtraRate   : any ;
	CreditDaysRisk   : any ;
}

export class CDH {
    GLAccount                       : any; 
	Customer                       : any; 
	TradingPartnerNo                       : any; 
	Segment                       : any; 
	BusinessArea                       : any; 
	ProfitCenter                       : any; 
	CostCenter                       : any; 
	Assignment                       : any; 
	DocumentType                       : any; 
	AmountDocCurr                       : any; 
	DocumentCurrency                       : any; 
	AmountLocalCurrency                       : any; 
	LocalCurrency                       : any; 
	Text                       : any; 
	DocumentDate                       : any; 
	PostingDate                       : any; 
	NetDueDate                       : any; 
	YearMonth                       : any; 
	PostingKey                       : any; 
	DocumentNumber                       : any; 
	FunctionalArea                       : any; 
	UserName                       : any; 
	Reference                       : any; 
	SamsungDocumentNumber                       : any; 
	WBSElement                       : any; 
}

export class BP_Relation{
    BPRelationID               :any;
	ParentSegment :any;
	ParentSegmentDescription:any; 
	ParentPartner :any;
	ParentPartnerName :any;
	ChildSegment :any;
	ChildSegmentDescription:any; 
	ChildPartner :any;
	ChildPartnerName :any;
	RelationType :any;
	RelationTypeDescription:any; 
}


export class Sales_History{
    SalesHistoryID : any ; 
	CustGroup : any ; 
	SoldTo : any ; 
	BillingType : any ; 
	BillingDate : any ; 
	ItemDiv : any ; 
	LocNetAmount : any ; 
	LocTaxAmount : any ; 
}

export class sellout{
    SellOutID: any; 
	Country: any; 
	Division: any; 
	PartnerType: any; 
	Month: any; 
	Year: any; 
	SellerCode: any; 
	P2: any; 
	SalesType: any; 
	Vol: any; 
	Value: any; 
}


export class Ar_History{
    Clrk: any 
	CusCode: any 
	CustomerName: any 
	BalanceAmt: any 
	InDueAmt: any 
	OverDueAmt: any 
	OverDuePercent: any 
	Positive_1_15_AR: any 
	Positive_16_31_AR: any 
	Positive_32_45_AR: any 
	Positive_46_60_AR: any 
	AR_Over_31_Amt: any 
	AR_Over_31_Percent: any 
	Negative_1_15_AR: any 
	Negative_16_31_AR: any 
	Negative_32_45_AR: any 
	Negative_46_60_AR: any 
	PositiveARAmt: any 
	NegativeARAmt: any 
	DownPmntAmt: any 
	Over_61_Positive_AR: any 
	Over_61_Negative_AR: any 
}


export class Customer_master{
    Customer  : any ; 
	ClerkAbbreviation  : any ; 
	AccountMemo  : any ; 
	AccClerksTelNo  : any ; 
	AccountAtCustomer  : any ; 
	UserAtCustomer  : any ; 
	Name  : any ; 
	TaxNumber2  : any ; 
	EmailAddress  : any ; 
	SalesOffice  : any ; 
	AccountGroup  : any ; 
	CustomerGroup  : any ; 
	PaymentTerms  : any ; 
}