import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-masterupload',
  templateUrl: './dialog-masterupload.component.html',
  styleUrls: ['./dialog-masterupload.component.scss']
})
export class DialogMasteruploadComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogMasteruploadComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  ngOnInit(): void {
  }

}

