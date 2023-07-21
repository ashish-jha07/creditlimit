import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { BsubjectService } from 'src/app/core/services/storage/bsubject.service';

@Component({
  selector: 'app-customerreport',
  templateUrl: './customerreport.component.html',
  styleUrls: ['./customerreport.component.scss']
})
export class CustomerreportComponent implements OnInit {

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
  constructor(private bs: BsubjectService, private fb:FormBuilder) {
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

}
