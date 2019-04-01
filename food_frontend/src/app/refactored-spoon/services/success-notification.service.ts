import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { SuccessNotificationMessagePipe } from '../pipes/success-notification-message.pipe';

@Injectable({
  providedIn: 'root'
})
export class SuccessNotificationService {
  constructor(
    public snackBar: MatSnackBar,
    public successNotificationMessagePipe: SuccessNotificationMessagePipe) { }

  openSnackBar(date: Date, action: string, message?: string) {
    let displayMessage: string = this.getDisplayMessage(date, action, message);
    this.snackBar.open(displayMessage, action, { duration: 5600 })
  }

  getDisplayMessage(date: Date, action: string, message?: string) {
    return this.successNotificationMessagePipe.transform(message, date, action);
  }

}
