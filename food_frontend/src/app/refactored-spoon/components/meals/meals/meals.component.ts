import { Component, OnInit } from '@angular/core';
import { MealService } from 'src/app/refactored-spoon/services/meal/meal.service';
import { Meal } from 'src/app/refactored-spoon/models/food.model';
import { SuccessNotificationService } from 'src/app/refactored-spoon/services/success-notification/success-notification.service';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { AddMealComponent } from '../add-meal/add-meal.component';

@Component({
  selector: 'app-meals',
  templateUrl: './meals.component.html',
  styleUrls: ['./meals.component.css']
})
export class MealsComponent implements OnInit {
  meals: Meal[] = [];
  shouldDisplayMealForm: boolean = false;

  constructor(
    private mealService: MealService,
    private successNotificationService: SuccessNotificationService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
      this.mealService.getMeals().subscribe((meals) => {
        console.log("retrieved all meals");
        console.log(meals);
        meals.forEach((meal) => {
          this.meals.push(meal.meal);
        });
        console.log("this.meals");
        console.log(this.meals);
      });
  }

  deleteAll() {
    this.mealService.deleteMeals().subscribe((res) => {
      console.log("deleted all meals");
      console.log(res);
    })
  }

  addMeal(mealId: string) {
    this.successNotificationService.openSnackBarMeal('add', true);
  }

  // openMealForm() {
  //     // const dialogConfig = new MatDialogConfig();
  //     // dialogConfig.autoFocus = true;
  //     // dialogConfig.restoreFocus = false;
  //     //this.dialog.open(AddMealComponent, dialogConfig)
  //     // this.dialog.open(MealsComponent, dialogConfig);
  // }

  openAddMeal() {
    this.shouldDisplayMealForm = true;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.restoreFocus = false;
    this.dialog.open(AddMealComponent, dialogConfig);
  }

  openMealForm() {
    this.shouldDisplayMealForm = true;
  }
}
