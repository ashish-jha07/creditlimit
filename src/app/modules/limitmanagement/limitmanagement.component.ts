import { Component, OnInit } from '@angular/core';
import { BsubjectService } from 'src/app/core/services/storage/bsubject.service';

@Component({
  selector: 'app-limitmanagement',
  templateUrl: './limitmanagement.component.html',
  styleUrls: ['./limitmanagement.component.scss']
})
export class LimitmanagementComponent implements OnInit {

  constructor( private bs : BsubjectService) { }

  ngOnInit(): void {
    
  }


}
