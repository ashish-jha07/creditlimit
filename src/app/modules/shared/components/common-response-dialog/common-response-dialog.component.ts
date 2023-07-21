import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-common-response-dialog',
  templateUrl: './common-response-dialog.component.html',
  styleUrls: ['./common-response-dialog.component.scss']
})
export class CommonResponseDialogComponent implements OnInit {

  dataname: any ;
  constructor(
    public dialogRef: MatDialogRef<CommonResponseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  ngOnInit(): void {
this.dataname = this.data.name;
  }

}