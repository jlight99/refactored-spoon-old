import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Meal, Food } from 'src/app/refactored-spoon/models/food.model';
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
export class MealComponent {
  @Input() meal: Meal
  @Output() mealEmitter = new EventEmitter<Meal>();
  foodColumns: string[] = ['value', 'foodGroup', 'amount', 'calories', 'delete'];
  url: string;

  constructor(
    public mealService: MealService,
    public successNotificationService: SuccessNotificationService
  ) { }

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

  deleteFood(food: Food) {
    this.meal.foods = this.meal.foods.filter(currentFood => currentFood.value !== food.value);
    this.mealEmitter.emit(this.meal);
  }

  deleteMeal() {
    this.meal.dishes = [];
    this.meal.foods = [];
    this.mealEmitter.emit(this.meal);
    this.successNotificationService.openSnackBarMeal('delete', true);
  }
}
