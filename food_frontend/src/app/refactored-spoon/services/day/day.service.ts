import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Day } from '../../models/food.model';


@Injectable({
  providedIn: 'root'
})
export class DayService {
  protected baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = 'http://localhost:3000';

  }

  getDay(date: Date): Observable<any> {
    console.log("getting day");
    const url = this.baseUrl + '/days/' + this.getZeroedDate(date).getTime();
    return this.http.get(url);
  }

  getDays(): Observable<any> {
    console.log("getting days()");
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
    console.log("deleteDays() from day service");
    return this.http.delete(this.baseUrl + '/days');
  }

  updateDay(day: Day): Observable<any> {
    console.log("updateDay");
    const url = this.baseUrl + '/days';
    return this.http.put(url, day);
  }

  // postDay(dayRecord: DayRecord): Observable<any> {
  //   console.log("posting day from day.service.ts");
  //   const newDay = dayRecord;
  //   return this.http.post(this.baseUrl + '/days', newDay);
  // }

  getZeroedDate(originalDate: Date) {
    const newDate = new Date(originalDate);
    return new Date(newDate.getFullYear(), newDate.getMonth(), newDate.getDate(), 0, 0, 0);
  }
}
