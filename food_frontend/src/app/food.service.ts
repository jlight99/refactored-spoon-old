import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Day } from '../app/food-form/food-form.component'


@Injectable({
  providedIn: 'root'
})
export class FoodService {
  protected baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = 'http://localhost:3000';
  }

  getFood(date: Date): Observable<any> {
    console.log("inside getFood");
    const url = this.baseUrl + '/days/' + date.getTime();
    //console.log(date.getDate().valueOf());
    console.log("get url");
    console.log(url);
    return this.http.get(url);
  }

  getFoods(): Observable<any> {
    return this.http.get(this.baseUrl + '/days');
  }

  deleteFood(date: Date): Observable<any> {
    console.log("deleteFood");
    console.log(date);
    const url = this.baseUrl + '/days/' + date.getTime();
    console.log("delete one url");
    console.log(url);
    return this.http.delete(url);
  }

  deleteFoods(): Observable<any> {
    return this.http.delete(this.baseUrl + '/days');
  }

  updateFood(dayRecord: Day, date: Date): Observable<any> {
    console.log("inside foodservice.updateFood");
    const url = this.baseUrl + '/days/' + date.getTime();
    console.log("update url");
    console.log(url);
    return this.http.put(url, dayRecord);
  }

  postFood(dayRecord: Day): Observable<any> {
    return this.http.post(this.baseUrl + '/days', dayRecord);
  }
}
