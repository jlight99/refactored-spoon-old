import { Component, Input, OnInit } from '@angular/core';
import { Meal, Day, Food } from 'src/app/refactored-spoon/models/food.model';
import { DayService } from 'src/app/refactored-spoon/services/day/day.service';
import { SuccessNotificationService } from 'src/app/refactored-spoon/services/success-notification/success-notification.service';
import { MealService } from 'src/app/refactored-spoon/services/meal/meal.service';

interface FileReaderEventTarget extends EventTarget {
  result: string;
}

interface FileReaderEvent extends ProgressEvent {
  target: FileReaderEventTarget;
  getMessage(): string;
}

@Component({
  selector: 'app-meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.css']
})
// export class MealComponent implements OnInit {
export class MealComponent {
  @Input() meal: Meal
  foodColumns: string[] = ['value', 'foodGroup', 'amount', 'calories', 'delete'];
  url: string;

  constructor(
    public mealService: MealService,
    public successNotificationService: SuccessNotificationService
  ) { }

  // ngOnInit() {
  //   console.log("inside meal component");
  //   console.log(this.meal);
  // }

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]);

      reader.onload = (event: FileReaderEvent) => {
        // this.url = JSON.parse(event.target.result);
        this.url = event.target.result;
      }
    }
  }

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
