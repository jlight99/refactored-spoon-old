import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Day } from './food.model';


@Injectable({
  providedIn: 'root'
})
export class DayService {
  protected baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = 'http://localhost:3000';
  }

  getFromDB(): Observable<any> {
    console.log("inside getFromDB()");
    const url = 'https://api.nal.usda.gov/ndb/search/?format=json&q=raw%20granny%20smith%20apple&sort=n&max=50&offset=0&api_key=EH6jWPD9LdlAPYrnQzR4luccqsnhUBwSd99kwocV';
    return this.http.get(url);
  }

  getDay(date: Date): Observable<any> {
    console.log("inside getDay");
    const url = this.baseUrl + '/days/' + date.getTime();
    console.log("get url");
    console.log(url);
    return this.http.get(url);
  }

  getDays(): Observable<any> {
    return this.http.get(this.baseUrl + '/days');
  }

  deleteDay(date: Date): Observable<any> {
    console.log("deleteDay");
    console.log(date);
    const url = this.baseUrl + '/days/' + date.getTime();
    console.log("delete one url");
    console.log(url);
    return this.http.delete(url);
  }

  deleteDays(): Observable<any> {
    return this.http.delete(this.baseUrl + '/days');
  }

  updateDay(dayRecord: Day, date: Date): Observable<any> {
    console.log("updateDay");
    const url = this.baseUrl + '/days/' + date.getTime();
    console.log("update url");
    console.log(url);
    return this.http.put(url, dayRecord);
  }

  postDay(dayRecord: Day): Observable<any> {
    return this.http.post(this.baseUrl + '/days', dayRecord);
  }
}
