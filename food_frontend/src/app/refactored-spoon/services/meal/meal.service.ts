import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Meal } from '../../models/food.model';

@Injectable({
  providedIn: 'root'
})
export class MealService {
  protected baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = 'http://35.226.163.59:3000';
  }

  getMeals(): Observable<any> {
    return this.http.get(this.baseUrl + '/meals');
  }

  postMeal(newMeal: Meal): Observable<any> {
    return this.http.post(this.baseUrl + '/meals', newMeal);
  }

  deleteMeals(): Observable<any> {
    return this.http.delete(this.baseUrl + '/meals');
  }

  deleteMeal(meal: Meal): Observable<any> {
    return this.http.delete(this.baseUrl + '/meals/' + meal.name);
  }
}
