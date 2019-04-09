import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Day, Meal, Food } from '../models/food.model';


@Injectable({
  providedIn: 'root'
})
export class DayService {
  protected baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = 'http://35.222.188.223:3000';
  }

  getDay(date: Date): Observable<any> {
    console.log("inside getDay");
    const url = this.baseUrl + '/days/' + this.getZeroedDate(date).getTime();
    console.log("get url");
    console.log(url);
    return this.http.get(url);
  }

  getDays(): Observable<any> {
    return this.http.get(this.baseUrl + '/days');
  }

  deleteDay(date: Date): Observable<any> {
    console.log("deleteDay");
    const url = this.baseUrl + '/days/' + this.getZeroedDate(date).getTime();
    console.log("delete one url");
    console.log(url);
    return this.http.delete(url);
  }

  deleteDays(): Observable<any> {
    return this.http.delete(this.baseUrl + '/days');
  }

  updateDay(dayRecord: Day, date: Date): Observable<any> {
    console.log("updateDay");
    const updatedDay = this.calculateTotalCalories(dayRecord);
    console.log("updateDay");
    const url = this.baseUrl + '/days/' + this.getZeroedDate(date).getTime();
    console.log("update url");
    console.log(url);
    return this.http.put(url, updatedDay);
  }

  postDay(dayRecord: Day): Observable<any> {
    const newDay = this.calculateTotalCalories(dayRecord);
    return this.http.post(this.baseUrl + '/days', newDay);
  }

  getZeroedDate(originalDate: Date) {
    const newDate = new Date(originalDate);
    return new Date(newDate.getFullYear(), newDate.getMonth(), newDate.getDate(), 0, 0, 0);
  }

  calculateTotalCalories(day: Day) {
    let totalCaloriesDay: number = 0;
    day.meals.forEach((meal: Meal) => {
      let totalCaloriesMeal: number = 0;
      meal.foods.forEach((food: Food) => {
        totalCaloriesMeal += Number(food.calories);
      });
      meal.totalCalories = totalCaloriesMeal;
      totalCaloriesDay += Number(meal.totalCalories);
    });
    day.totalCalories = totalCaloriesDay;
    return day;
  }
}
