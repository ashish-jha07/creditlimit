import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-comman-dialog',
  templateUrl: './comman-dialog.component.html',
  styleUrls: ['./comman-dialog.component.scss']
})
export class CommanDialogComponent implements OnInit {
dataname: any ;
  constructor(
    public dialogRef: MatDialogRef<CommanDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
   
  ) {}

  ngOnInit(): void {
this.dataname = this.data.name.replace(/\n/g, '<br />');
  }

}
