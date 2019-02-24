import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Food } from '../app/food-form/food-form.component'
import { Record } from '../app/food-form/food-form.component'


@Injectable({
  providedIn: 'root'
})
export class FoodService {
  protected baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = 'http://localhost:3000';
  }

  getFoods(): Observable<any> {
    return this.http.get(this.baseUrl + '/foods');
  }

  deleteFoods(): Observable<any> {
    console.log("inside service: delete");
    return this.http.delete(this.baseUrl + '/foods');
  }

  postFood(foodRecord: Record): Observable<any> {
    return this.http.post(this.baseUrl + '/food', foodRecord);
  }
}
