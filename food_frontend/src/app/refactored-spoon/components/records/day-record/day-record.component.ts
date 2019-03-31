import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Day, Meal, Food } from '../../../models/food.model';
import { DayService } from '../../../services/day.service';

@Component({
  selector: 'app-day-record',
  templateUrl: './day-record.component.html',
  styleUrls: ['./day-record.component.css']
})
export class DayRecordComponent implements OnInit {
  @Input() day: Day;
  @Output() getAllEmitter = new EventEmitter<boolean>();

  foodColumns: string[] = ['value', 'foodGroup', 'measure', 'quantity', 'calories', 'delete'];

  chartColumns = [
    { label: 'meal', type: 'string' },
    { label: 'calories', type: 'number' },
    { type: 'string', role: 'annotation' }
  ];

  chartRows = [];

  chartOptions = {
    'title': 'Calories per meal'
  };

  chartId = 'new_chart';

  chartType = 'PieChart';

  shouldShowAnalysis: boolean = false;

  constructor(
    private dayService: DayService
  ) { }

  ngOnInit() {
    this.day.meals.forEach((meal: Meal) => {
      this.chartRows.push({ c: [{ v: meal.name }, { v: meal.totalCalories }, { v: 'Annotated' }] });
    });
  }

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

  toggleShowAnalysis() {
    this.shouldShowAnalysis = !this.shouldShowAnalysis;
  }
}
