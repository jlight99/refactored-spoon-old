import { Component, Input, Output, SimpleChanges, EventEmitter } from '@angular/core';
import { Day, Meal, Food } from '../food.model';

@Component({
  selector: 'app-show-records',
  templateUrl: './show-records.component.html',
  styleUrls: ['./show-records.component.css']
})
export class ShowRecordsComponent {
  @Input() dayRecords: Day[];
  @Output() deleteDayEmitter = new EventEmitter<Date>();
  @Output() deleteFoodEmitter = new EventEmitter<Day>();

  foodColumns: string[] = ['value', 'foodGroup', 'measure', 'quantity', 'calories', 'delete'];

  deleteDay(date: Date) {
    this.deleteDayEmitter.emit(date);
  }

  deleteFood(day: Day, meal: Meal, food: Food) {
    day.meals.forEach((currentMeal: Meal) => {
      if (currentMeal.name.toLowerCase() === meal.name.toLowerCase()) {
        meal.foods = meal.foods.filter(currentFood => currentFood.value !== food.value)
      }
    });

    this.deleteFoodEmitter.emit(day);
  }

}
