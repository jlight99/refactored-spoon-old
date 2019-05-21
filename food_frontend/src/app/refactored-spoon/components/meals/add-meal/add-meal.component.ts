import { Component, OnInit } from '@angular/core';
import { SuccessNotificationService } from 'src/app/refactored-spoon/services/success-notification/success-notification.service';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-add-meal',
  templateUrl: './add-meal.component.html',
  styleUrls: ['./add-meal.component.css']
})
export class AddMealComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<AddMealComponent>,
    private successNotificationService: SuccessNotificationService
  ) { }

  ngOnInit() {
  }

  addMeal(mealId: string) {
    this.successNotificationService.openSnackBarMeal('add', true);
  }

  close() {
    this.dialogRef.close();
  }

}
