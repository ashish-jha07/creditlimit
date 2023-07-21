import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsubjectService } from 'src/app/core/services/storage/bsubject.service';

@Component({
  selector: 'app-limit-raise-arequest',
  templateUrl: './limit-raise-arequest.component.html',
  styleUrls: ['./limit-raise-arequest.component.scss']
})
export class LimitRaiseARequestComponent implements OnInit {
  isOpen: any;
  requestType : any = false;
  requestarray: any= []
  reqForm = this.fb.group({

    partnerIds: this.fb.array([
      this.fb.control('1387659', Validators.compose([Validators.required, Validators.maxLength(15)]) )
    ])
  });

  // 1387659
  submit:any = false;
  currentTab: any = 'partner0'
  approverData: any ;
  approvalDatas : any;
  constructor(private bs: BsubjectService, private fb:FormBuilder, private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    this.approverData = navigation?.extras?.state  as any ;
   
  
    this.bs.getSideMenus().subscribe((res: any) => {
      this.isOpen = res;
    })
   }

  ngOnInit(): void {
    if(this.approverData){
      this.requestarray = [];
      this.requestarray.push(this.approverData?.PartnerCode);
      this.approvalDatas = JSON.stringify(this.approverData);
      this.partnerIds.controls[0].setValue(this.approverData?.PartnerCode);
    }
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
