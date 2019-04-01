import { Component, OnInit } from '@angular/core';
import { Day, Meal, Food } from '../../models/food.model';
import { DayService } from '../../services/day.service';
import { SuccessNotificationService } from '../../services/success-notification.service';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.css']
})
export class RecordsComponent implements OnInit {
  dayRecords: Day[] = [];
  meal: string;
  food: string;
  add: boolean = false;
  date: Date;
  shouldDisplayAdd: boolean = false;

  constructor(
    public dayService: DayService,
    public successNotificationService: SuccessNotificationService
  ) { }

  ngOnInit() {
    this.getAll();
  }

  getAll(): void {
    this.dayService.getDays().subscribe((dayRecords: Day[]) => {
      this.dayRecords = dayRecords;
    })
  }

  setDate(newDate: Date) {
    this.date = newDate;
  }

  setMeal(newMealStr: string) {
    this.meal = newMealStr;
  }

  displayAddFood() {
    this.shouldDisplayAdd = true;
  }

  record(addedFood: Food): void {
    this.dayService.getDay(this.date).subscribe((dayRecord: Day) => {
      if (!dayRecord) {
        this.post(addedFood);
      } else {
        this.put(dayRecord, addedFood);
      }
    })
  }

  post(newFood: Food): void {
    var breakfast: Meal = {
      name: 'breakfast',
      foods: [],
      restaurant: undefined,
      totalCalories: 0
    };
    var lunch: Meal = {
      name: 'lunch',
      foods: [],
      restaurant: undefined,
      totalCalories: 0
    };
    var dinner: Meal = {
      name: 'dinner',
      foods: [],
      restaurant: undefined,
      totalCalories: 0
    };

    if (this.meal.toLowerCase() === breakfast.name) {
      breakfast.foods.push(newFood);
    } else if (this.meal.toLowerCase() === lunch.name) {
      lunch.foods.push(newFood);
    } else if (this.meal.toLowerCase() === dinner.name) {
      dinner.foods.push(newFood);
    }

    var daysMeals: Meal[] = [breakfast, lunch, dinner];

    const day: Day = {
      date: this.dayService.getZeroedDate(this.date),
      meals: daysMeals,
      totalCalories: 0
    }

    this.dayService.postDay(day).subscribe(() => {
      this.add = false;

      //this.successNotificationService.openSnackBar("created record of " + (new Date(day.date)).toLocaleDateString("en-US"), "created")
      this.successNotificationService.openSnackBar(day.date, "created")

      this.getAll();
    })
  }

  put(dayRecord: Day, newFood: Food): void {
    dayRecord.meals.forEach((meal: Meal) => {
      if (meal.name.toLowerCase() === this.meal.toLowerCase()) {
        meal.foods.push(newFood);
      }
    });

    this.dayService.updateDay(dayRecord, this.dayService.getZeroedDate(dayRecord.date)).subscribe(() => {
      this.add = false;

      this.successNotificationService.openSnackBar(dayRecord.date, "updated");

      this.getAll();
    })
  }
}
