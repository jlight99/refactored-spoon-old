import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Day, Meal, Food } from '../../../models/food.model';
import { DayService } from '../../../services/day.service';

@Component({
  selector: 'app-day-record',
  templateUrl: './day-record.component.html',
  styleUrls: ['./day-record.component.css']
})
export class DayRecordComponent {
  @Input() day: Day;
  @Output() getAllEmitter = new EventEmitter<boolean>();

  foodColumns: string[] = ['value', 'foodGroup', 'measure', 'quantity', 'calories', 'delete'];

  constructor(
    private dayService: DayService
  ) {}

  deleteDay(date: Date): void {
    this.dayService.deleteDay(new Date(date)).subscribe(() => {
      this.getAllEmitter.emit(true);
      //this.openSnackBar("deleted record of " + date, "deleted")
    });
  }

  deleteFood(day: Day, meal: Meal, food: Food) {
    day.meals.forEach((currentMeal: Meal) => {
      if (currentMeal.name.toLowerCase() === meal.name.toLowerCase()) {
        meal.foods = meal.foods.filter(currentFood => currentFood.value !== food.value)
      }
    });

    this.dayService.updateDay(day, new Date(day.date)).subscribe(() => {
      //this.openSnackBar("updated record of " + day.date + " successfully deleted food", "deleted");
      this.getAllEmitter.emit(true);
    })
  }
}
