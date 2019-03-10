import { Component, OnInit } from '@angular/core';
import { FoodService } from '../food.service';
import { FormGroup, FormControl } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';

export interface Month {
  value: number,
  viewValue: string
}

export interface Food {
  value: string,
  foodGroup: string,
  calories: number,
  quantity: number
}

export interface Meal {
  name: string,
  foods: Food[],
  restaurant: string
}

export interface Day {
  date: Date,
  meals: Meal[],
  totalCalories: number
}

@Component({
  selector: 'app-food-form',
  templateUrl: './food-form.component.html',
  styleUrls: ['./food-form.component.css']
})
export class FoodFormComponent implements OnInit {
  public form: FormGroup;
  public meal: string;
  public recordMeal: Meal;
  public currentDate: Date = new Date();
  public day: number = this.getCurrentDay();
  public days: number[] = [];
  public month: number = this.getCurrentMonth();
  public year: number = this.getCurrentYear();
  public date: Date;
  public foodGroup: string;
  public quantity: number = 1;
  public food: string;
  public add: boolean = false;
  public list: boolean = false;
  public dayRecords: Day[] = [];
  public dayRecord: Day;

  constructor(
    private foodService: FoodService,
    private sanitizer: DomSanitizer,
    private iconRegistry: MatIconRegistry
  ) {
    iconRegistry.addSvgIcon(
      'garbage',
      sanitizer.bypassSecurityTrustResourceUrl('../../assets/images/garbage.svg')
    )
  }

  formControl: FormControl = new FormControl('');

  foodColumns: string[] = ['value', 'foodGroup', 'calories', 'quantity'];

  meals: string[] =[
    'Breakfast', 'Lunch', 'Dinner'
  ];

  months: Month[] = [
    {value: 1, viewValue: 'January'}, {value: 2, viewValue: 'February'}, {value: 3, viewValue: 'March'},
    {value: 4, viewValue: 'April'}, {value: 5, viewValue: 'May'}, {value: 6, viewValue: 'June'},
    {value: 7, viewValue: 'July'}, {value: 8, viewValue: 'August'}, {value: 9, viewValue: 'September'},
    {value: 10, viewValue: 'October'}, {value: 11, viewValue: 'November'}, {value: 12, viewValue: 'December'}
  ];

  years: number[] = [
    2017, 2018, 2019
  ];
  
  foodGroups: string[] = [
    'Fruits and Vegetables', 'Whole grains', 'Proteins', 'Other'
  ];

  public ngOnInit(): void {
    this.getDays();
    this.getAll();
    this.monthChange();
  }

  public getDays(): void {
    var numDays = 31;
    if (this.month === 2) {
      if (this.year % 4 === 0 && (this.year % 100 !== 0 || this.year % 400 === 0)) {
        numDays = 29;
      } else {
        numDays = 28;
      }
    } else if (this.month === 4 || this.month === 6 || this.month === 9 || this.month === 11) {
      numDays = 30;
    }
    for (var i = 1; i <= numDays; i++) {
      this.days.push(i);
    }
  }

  public get(date: Date): void {
    this.foodService.getFood(date).subscribe((dayRecord: Day) => {
      this.dayRecord = dayRecord;
    })
  }

  public getAll(): void {
    this.foodService.getFoods().subscribe((dayRecords: Day[]) => {
      this.dayRecords = dayRecords;
    })
  }

  public deleteOne(date: Date): void {
    this.foodService.deleteFood(new Date(date)).subscribe(() => {});
  }

  public deleteAll(): void {
    this.foodService.deleteFoods().subscribe(() => {});
  }

  public post(newFood: Food): void {
    console.log("inside post");
    var breakfast: Meal = {
      name: 'breakfast',
      foods: [],
      restaurant: undefined
    };
    var lunch: Meal = {
      name: 'lunch',
      foods: [],
      restaurant: undefined
    };
    var dinner: Meal = {
      name: 'dinner',
      foods: [],
      restaurant: undefined
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
      date: new Date(this.year, this.month - 1, this.day, 0, 0, 0),
      meals: daysMeals,
      totalCalories: this.calculateTotalCalories(daysMeals)
    }

    this.foodService.postFood(day).subscribe(() => {
      this.add = false;

      this.getAll();
    })
  }

  public put(dayRecord: Day, newFood: Food): void {
    dayRecord.meals.forEach((meal: Meal) => {
      if (meal.name.toLowerCase() === this.meal.toLowerCase()) {
        meal.foods.push(newFood);
      }
    });

    this.foodService.updateFood(dayRecord, new Date(dayRecord.date)).subscribe(() => {
      this.add = false;

      this.getAll();
    })
  }

  public record(): void {
    var newFood: Food = {
      value: this.food,
      foodGroup: this.foodGroup,
      calories: 0,
      quantity: 1
    }

    this.foodService.getFood(new Date(this.year, this.month - 1, this.day, 0, 0, 0)).subscribe((dayRecord: Day) => {
      if (!dayRecord) {
        this.post(newFood);
      } else {
        this.put(dayRecord, newFood);
      }
    })
  }

  public fieldsFilled() {
    if (this.meal && this.food && this.foodGroup) {
      return true;
    }
    return false;
  }

  public addFood() {
    this.add = true;
  }

  public formatDate(date: Date): string {
    return date.toDateString();
  }

  public getCurrentDay(): number {
    return this.currentDate.getDate();
  }

  public getCurrentMonth(): number {
    return this.currentDate.getMonth() + 1;
  }

  public getCurrentYear(): number {
    return this.currentDate.getFullYear();
  }

  public displayAdd(): boolean {
    return this.add;
  }

  public getDisplayDay(thing: JSON): string {
    return JSON.stringify(thing);
  }

  public calculateTotalCalories(meals: Meal[]) {
    var totalCal: number = 0;
    meals.forEach((meal: Meal) => {
      meal.foods.forEach((food: Food) => {
        totalCal += food.calories;
      })
    });
    return totalCal;
  }

  public monthChange() {
    const monthControl = this.form.get('month');
    monthControl.valueChanges.forEach(
      (value: number) => {
        console.log("month value changed");
        this.getDays();
      }
    )
  }
}