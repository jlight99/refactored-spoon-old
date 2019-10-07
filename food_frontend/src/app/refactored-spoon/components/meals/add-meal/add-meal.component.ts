import { Component } from '@angular/core';
import { SuccessNotificationService } from 'src/app/refactored-spoon/services/success-notification/success-notification.service';
import { MatDialogRef } from '@angular/material';
import { Meal } from 'src/app/refactored-spoon/models/food.model';

@Component({
  selector: 'app-add-meal',
  templateUrl: './add-meal.component.html',
  styleUrls: ['./add-meal.component.css']
})
export class AddMealComponent {
  constructor(
    private dialogRef: MatDialogRef<AddMealComponent>,
    private successNotificationService: SuccessNotificationService
  ) { }

  addMeal(newMeal: Meal) {
    this.successNotificationService.openSnackBarMeal('add', true);
  }

  close() {
    this.dialogRef.close();
  }
}
