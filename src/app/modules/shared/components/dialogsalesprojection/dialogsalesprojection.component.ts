import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UtilService } from 'src/app/core/services/util/util.service';

@Component({
  selector: 'app-dialogsalesprojection',
  templateUrl: './dialogsalesprojection.component.html',
  styleUrls: ['./dialogsalesprojection.component.scss']
})
export class DialogsalesprojectionComponent implements OnInit {
  dataname: any ;
  constructor(
    private utilService: UtilService,
    public dialogRef: MatDialogRef<DialogsalesprojectionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
   
  ) {}

  ngOnInit(): void {
   
this.dataname = this.data.name.replace(/\n/g, '<br />');
  }
downloadfails(){
  if(!this.data?.datastatus){
    this.utilService.getDownloadFileWithData(this.data.recordsData.headerArray,this.data.recordsData.dataArray, "SalesProjectionError");
  }
}
}
