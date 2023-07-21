import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/core/services/http/http.service';
import { BsubjectService } from 'src/app/core/services/storage/bsubject.service';
import { HomeService } from 'src/app/modules/home/services/home.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Input() type: string | undefined  ;
  isOpen: any;
  currentTab:any = 'sales';
  constructor(private route:Router, private bs : BsubjectService) { }

  ngOnInit(): void {
    if(this.type){
     this.currentTab = 'RPT'; 
    }
    this.bs.getSideMenus().subscribe((res: any)=>{
      this.isOpen = res;
     })
  }
  tabChange(tab:any){
    this.currentTab = tab;
  }
  goTo(name: any){
    if(name == 'sales')
    this.route.navigate(['limit/sales'])
    else if(name == 'limitlist')
    this.route.navigate(['limit/limitlist/limit-list-data'])
    else if(name == 'RPT')
    this.route.navigate(['reports/customer-report'])
    else if(name == 'approver')
    this.route.navigate(['limit/limitlist/approver-list-data'])
  }
}
