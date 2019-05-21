import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { SuccessNotificationMessagePipe } from '../../pipes/success-notification-message.pipe';

@Injectable({
  providedIn: 'root'
})
export class SuccessNotificationService {
  constructor(
    public snackBar: MatSnackBar,
    public successNotificationMessagePipe: SuccessNotificationMessagePipe) { }

  openSnackBarDayRecord(date: Date, action: string, message?: string) {
    let displayMessage: string = this.getDisplayMessageDayRecord(date, action, message);
    this.snackBar.open(displayMessage, action, { duration: 5600 })
  }

  getDisplayMessageDayRecord(date: Date, action: string, message?: string) {
    return this.successNotificationMessagePipe.transform(message, date, action);
  }

  openSnackBarLogin(action: string, succeeded: boolean) {
    /*const successStatus: string = succeeded? 'successfully' : 'unsuccessfully';
    if (action.toLocaleLowerCase() === 'login') {
      displayMessage = successStatus + ' logged in!';
    } else if (action.toLocaleLowerCase() === 'signup') {
      displayMessage = successStatus + ' signed up!';
    } else if (action.toLocaleLowerCase() === 'logout') {
      displayMessage = successStatus + ' logged out!';
    }*/

    let successStatus = succeeded ? 'succeeded' : 'failed';
    let displayMessage = action + ' ' + successStatus;

    this.snackBar.open(displayMessage, successStatus, { duration: 5600 });
  }

  openSnackBarMeal(action: string, succeeded: boolean) {
    let successStatus = succeeded ? 'succeeded' : 'failed';
    let displayMessage = action + ' meal ' + successStatus;

    this.snackBar.open(displayMessage, successStatus, { duration: 5600 });
  }
}
