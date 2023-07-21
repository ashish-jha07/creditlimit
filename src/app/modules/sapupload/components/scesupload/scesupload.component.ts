import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { BsubjectService } from 'src/app/core/services/storage/bsubject.service';
import { UiService } from 'src/app/core/services/ui/ui.service';
import { UtilService } from 'src/app/core/services/util/util.service';
import { SapService } from '../../services/sap.service';

@Component({
  selector: 'app-scesupload',
  templateUrl: './scesupload.component.html',
  styleUrls: ['./scesupload.component.scss']
})
export class ScesuploadComponent implements OnInit {

  isOpen: any;
  requestType : any = false;
  requestarray: any= []
  reqForm = this.fb.group({

    partnerIds: this.fb.array([
      this.fb.control('', Validators.required)
    ])
  });
  submit:any = false;
  currentTab: any = 'partner0'
  constructor(private bs: BsubjectService, private fb:FormBuilder, private utilService: UtilService, private uiService: UiService,private sap : SapService) {
    this.bs.getSideMenus().subscribe((res: any) => {
      this.isOpen = res;
    })
   }

  ngOnInit(): void {
 
  }
  get partnerIds() {
    return this.reqForm.get('partnerIds') as FormArray;
  }
  addPartnerId() {
    this.partnerIds.push(this.fb.control('',  Validators.required ));
  }

  deletePartnerId(index: number) {
    this.partnerIds.removeAt(index);
  }
  changeTab(i:any){
    this.currentTab= 'partner'+i;
  }
  bulkTab(){
    this.reqForm = this.fb.group({

      partnerIds: this.fb.array([
        this.fb.control('', Validators.required)
      ])
    });
    this.submit= false; 
    this.requestType = true;
    this.requestarray= [];
  }
  individualTab(){
    this.reqForm = this.fb.group({

      partnerIds: this.fb.array([
        this.fb.control('', Validators.required)
      ])
    });
    this.submit= false; 
    this.requestType = false;
    this.requestarray= [];
  }
  raiseAreq(){
    this.submit = true;
   if(this.reqForm.valid){
    this.requestarray = this.reqForm.get('partnerIds')?.value;
    this.currentTab = 'partner0';
   }else {
     return;
   }
  }

  gitsapdownload(){
    let data: any ={};
    this.sap.GetDownloadSAPUpload(data).subscribe((res:any)=>{
      console.log(JSON.stringify(res))
    
      let dataa = JSON.parse(res.Response[0]);
      
      if( dataa.length > 0) {
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
 
      this.utilService.getDownloadSapFileWithData(headerArray,dataArray, "Sap_Upload");
      }
    else{
      //res?.Message,
      this.uiService.openToastMessage("Records not available ", '');
    }
    })

    }
  

}
