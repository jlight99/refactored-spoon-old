import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Day, Meal } from '../../../models/food.model';
import { DayService } from '../../../services/day/day.service';
import { SuccessNotificationService } from 'src/app/refactored-spoon/services/success-notification/success-notification.service';

@Component({
  selector: 'app-day-record',
  templateUrl: './day-record.component.html',
  styleUrls: ['./day-record.component.css']
})
export class DayRecordComponent implements OnInit {
  @Input() day: Day;
  @Output() getAllEmitter = new EventEmitter<boolean>();

  // chartColumns = [
  //   { label: 'meal', type: 'string' },
  //   { label: 'calories', type: 'number' },
  //   { type: 'string', role: 'annotation' }
  // ];

  // chartRows = [];

  // chartOptions = {
  //   'title': 'Calories per meal'
  // };

  // chartId = 'new_chart';

  // chartType = 'PieChart';

  // shouldShowAnalysis: boolean = false;

  constructor(
    public dayService: DayService,
    public successNotificationService: SuccessNotificationService
  ) { }

  ngOnInit() {
    this.day.meals.sort(function(a: Meal, b: Meal) {
      var mealTypeToNum = function(mealType: String) {
        switch(mealType) {
          case 'breakfast':
            return 1;
          case 'lunch':
            return 2;
          case 'dinner':
            return 3;
          case 'snack':
            return 4;
          }
      }
      return mealTypeToNum(a.type) - mealTypeToNum(b.type);
    });
    // this.day.meals.forEach((meal: Meal) => {
    //   this.chartRows.push({ c: [{ v: meal.name }, { v: meal.totalCalories }, { v: 'Annotated' }] });
    // });
    // console.log("dayrecord");
    // console.log(this.day);
  }

  // toggleShowAnalysis() {
  //   this.shouldShowAnalysis = !this.shouldShowAnalysis;
  // }
}
