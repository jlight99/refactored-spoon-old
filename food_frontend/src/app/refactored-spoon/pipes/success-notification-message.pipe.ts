import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'successNotificationMessage'
})
export class SuccessNotificationMessagePipe implements PipeTransform {

  transform(value: string, date: Date, action: string): string {
    let displayMessage: string = action + " record of " + (new Date(date)).toLocaleDateString("en-US");

    if (value) {
      displayMessage += " : " + value;
    }
    return displayMessage;
  }

}
