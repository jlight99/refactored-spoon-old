import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.css']
})
export class ConfirmationDialogComponent {
  action: string;

  constructor(
    private dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.action = data.action;
  }

  confirm(shouldConfirm: boolean) {
    this.dialogRef.close(shouldConfirm);      
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }
}
