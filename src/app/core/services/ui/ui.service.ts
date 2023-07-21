import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class UiService {
  constructor(private snackBar:MatSnackBar) { }

  openNotificationSnackBar(notification: string) {
   
  }
  openErrorSnackBar(arg0: string) {
  
  }

  /**
   * @param message  string
   * @param action   action 
   * @param duration as time
   */
  openSnackBar(message: string, action: string, duration: number) {
    this.snackBar.open(message, action, {
       duration: duration,
       horizontalPosition: "right",
       verticalPosition:   "top",
    });
  }

  openToastMessage(message: string, action: string) {
    this.snackBar.open(message, action, {
       duration: 3000,
       horizontalPosition: "right",
       verticalPosition:   "top",
    });
  }
  openToastMessageLong(message: string, action: string) {
    this.snackBar.open(message, action, {
       duration: 5000,
       horizontalPosition: "right",
       verticalPosition:   "top",
    });
  }
}
