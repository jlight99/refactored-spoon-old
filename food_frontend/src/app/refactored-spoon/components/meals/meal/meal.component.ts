import { Component, Input } from '@angular/core';
import { Meal, Day, Food } from 'src/app/refactored-spoon/models/food.model';
import { DayService } from 'src/app/refactored-spoon/services/day/day.service';
import { SuccessNotificationService } from 'src/app/refactored-spoon/services/success-notification/success-notification.service';
import { MealService } from 'src/app/refactored-spoon/services/meal/meal.service';

@Component({
  selector: 'app-meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.css']
})
export class MealComponent {
  @Input() meal: Meal
  foodColumns: string[] = ['value', 'foodGroup', 'amount', 'calories', 'delete'];

  constructor(
    public mealService: MealService,
    public successNotificationService: SuccessNotificationService
  ) { }

  // deleteFood(day: Day, meal: Meal, food: Food) {
  //   day.meals.forEach((currentMeal: Meal) => {
  //     if (currentMeal.name.toLowerCase() === meal.name.toLowerCase()) {
  //       meal.foods = meal.foods.filter(currentFood => currentFood.value !== food.value)
  //     }
  //   });

  //   // this.dayService.updateDay(day, new Date(day.date)).subscribe(() => {
  //   //   this.successNotificationService.openSnackBarDayRecord(day.date, "updated", "deleted food " + food.value);
  //   // })
  // }

  //implement CRUD for meal

  // deleteMeal() {
  //   this.mealService.deleteMeal(this.meal).subscribe((res) => {
  //     console.log("deleted meal");
  //   })
  // }

}
