import { Component, OnInit } from '@angular/core';
import { FoodService } from '../food.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

export interface Month {
  value: number;
  viewValue: string;
}

export interface Food {
  value: string;
  foodGroup: string;
}

export interface Record {
  food: Food,
  quantity: number,
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
  public quantity: number = 1;
  public food: string;
  public add: boolean = false;
  public list: boolean = false;
  public records: Record[] = [];

  constructor(
    private foodService: FoodService,
  ) {}

  meals: string[] =[
    'Breakfast', 'Lunch', 'Dinner'
  ];

  days: number[] = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31
  ]

  months: Month[] = [
    {value: 1, viewValue: 'January'}, {value: 2, viewValue: 'February'}, {value: 3, viewValue: 'March'},
    {value: 4, viewValue: 'April'}, {value: 5, viewValue: 'May'}, {value: 6, viewValue: 'June'},
    {value: 7, viewValue: 'July'}, {value: 8, viewValue: 'August'}, {value: 9, viewValue: 'September'},
    {value: 10, viewValue: 'October'}, {value: 11, viewValue: 'November'}, {value: 12, viewValue: 'December'}
  ];

  years: number[] = [
    2017, 2018, 2019
  ]

  foodGroups: string[] = [
    'Fruits and Vegetables', 'Whole grains', 'Proteins'
  ]

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
    const foodEntry: Food = {
      value: this.food,
      foodGroup: this.foodGroup
    }

    const record: Record = {
      food: foodEntry,
      quantity: this.quantity,
      meal: this.meal,
      date: this.date
    }

    this.foodService.postFood(record).subscribe(() => {
      this.add = false;

      this.foodService.getFoods().subscribe((foodRecords: Record[]) => {
        this.records = foodRecords;
      });
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

  public displayAdd(): boolean {
    return this.add;
  }
}