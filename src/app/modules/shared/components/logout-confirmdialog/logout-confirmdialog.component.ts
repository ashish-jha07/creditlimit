import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-logout-confirmdialog',
  templateUrl: './logout-confirmdialog.component.html',
  styleUrls: ['./logout-confirmdialog.component.scss']
})
export class LogoutConfirmdialogComponent implements OnInit {


  constructor(    public dialogRef: MatDialogRef<LogoutConfirmdialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,) { }

  ngOnInit(): void {
  }
  onConfirm(): void {
    // Close the dialog, return true
    this.dialogRef.close(true);
  }

  onDismiss(): void {
    // Close the dialog, return false
    this.dialogRef.close(false);
  }
}
