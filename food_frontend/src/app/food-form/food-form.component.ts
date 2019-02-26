import { Component, OnInit } from '@angular/core';
import { FoodService } from '../food.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

export interface Meal {
  value: string;
  viewValue: string;
}

export interface Day {
  value: number;
  viewValue: number;
}

export interface Month {
  value: number;
  viewValue: string;
}

export interface Year {
  value: number;
  viewValue: number;
}

export interface FoodGroup {
  value: string;
  viewValue: string;
}

export interface Food {
  value: string;
  foodGroup: FoodGroup;
}

export interface Record {
  food: string,
  foodGroup: string,
  //foodGroup: FoodGroup,
  meal: string,
  date: Date
}

@Component({
  selector: 'app-food-form',
  templateUrl: './food-form.component.html',
  styleUrls: ['./food-form.component.css']
})
export class FoodFormComponent {
  public form: FormGroup;
  public meal: string;
  public currentDate: Date = new Date();
  public day: number = this.getCurrentDay();
  public month: number = this.getCurrentMonth();
  public year: number = this.getCurrentYear();
  public date: Date;
  public foodGroup: string;
  //public foodGroup: FoodGroup;
  //public foodGroupStr: string;
  public food: string;
  public add: boolean = false;
  public list: boolean = false;
  public records: Record[] = [];

  constructor(
    private foodService: FoodService,
  ) {}

  meals: Meal[] = [
    {value: 'br', viewValue: 'Breakfast'},
    {value: 'ln', viewValue: 'Lunch'},
    {value: 'dn', viewValue: 'Dinner'}
  ];

  days: Day[] = [
    {value: 1, viewValue: 1}, {value: 2, viewValue: 2}, {value: 3, viewValue: 3},
    {value: 4, viewValue: 4}, {value: 5, viewValue: 5}, {value: 6, viewValue: 6},
    {value: 7, viewValue: 7}, {value: 8, viewValue: 8}, {value: 9, viewValue: 9},
    {value: 10, viewValue: 10}, {value: 11, viewValue: 11}, {value: 12, viewValue: 12},
    {value: 13, viewValue: 13}, {value: 14, viewValue: 14}, {value: 15, viewValue: 15},
    {value: 16, viewValue: 16}, {value: 17, viewValue: 17}, {value: 18, viewValue: 18},
    {value: 19, viewValue: 19}, {value: 20, viewValue: 20}, {value: 21, viewValue: 21},
    {value: 22, viewValue: 22}, {value: 23, viewValue: 23}, {value: 24, viewValue: 24},
    {value: 25, viewValue: 25}, {value: 26, viewValue: 26}, {value: 27, viewValue: 27},
    {value: 28, viewValue: 28}, {value: 29, viewValue: 29}, {value: 30, viewValue: 30},
    {value: 31, viewValue: 31}
  ];

  months: Month[] = [
    {value: 1, viewValue: 'January'}, {value: 2, viewValue: 'February'}, {value: 3, viewValue: 'March'},
    {value: 4, viewValue: 'April'}, {value: 5, viewValue: 'May'}, {value: 6, viewValue: 'June'},
    {value: 7, viewValue: 'July'}, {value: 8, viewValue: 'August'}, {value: 9, viewValue: 'September'},
    {value: 10, viewValue: 'October'}, {value: 11, viewValue: 'November'}, {value: 12, viewValue: 'December'}
  ];

  years: Year[] = [
    {value: 2019, viewValue: 2019}
  ];

  foodGroups: FoodGroup[] = [
    {value: 'fv', viewValue: 'Fruits and Vegetables'},
    {value: 'wg', viewValue: 'Whole grains'},
    {value: 'pr', viewValue: 'Proteins'}
  ];

  public ngOnInit(): void {
    this.foodService.getFoods().subscribe((foodRecords: Record[]) => {
      this.records = foodRecords;
    });
  }

  public delete(): void {
    this.foodService.deleteFoods().subscribe(() => {
    });
  }

  public post(): void {
    const record: Record = {
      food: this.food,
      foodGroup: this.foodGroup,
      meal: this.meal,
      date: this.date
    }

    this.foodService.postFood(record).subscribe(() => {
      console.log("posted");
      this.add = false;
    });
  }

  public record(): void {
    this.date = new Date(this.year, this.month - 1, this.day, 0, 0, 0);

    this.post();
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
}