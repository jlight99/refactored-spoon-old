import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FoodService {
  protected baseUrl: string;
  protected apiKey: string;
  protected apiKeyUrl: string;
  protected formatUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = 'https://api.nal.usda.gov/ndb/';
    this.apiKey = 'EH6jWPD9LdlAPYrnQzR4luccqsnhUBwSd99kwocV';
    this.apiKeyUrl = 'api_key=' + this.apiKey;
    this.formatUrl = 'format=json';
  }

  getFoodGroups(): Observable<any> {
    console.log("inside getFoodGroups");
    const apiType = 'list';
    const apiUrl = apiType + '/?';
    const sortType = 'n';
    const sortUrl = 'sort=' + sortType;
    const listType = 'g';
    const listUrl = 'lt=' + listType;
    const url = this.baseUrl + apiUrl + sortUrl + '&' + listUrl + '&' + this.apiKeyUrl;
    return this.http.get(url);
    //https://api.nal.usda.gov/ndb/list?format=json&lt=g&sort=n&max=100&api_key=EH6jWPD9LdlAPYrnQzR4luccqsnhUBwSd99kwocV
  }

  getNdbno(queryStr: string): Observable<any> {
    console.log("inside getNdbno()");
    const query = this.formatQueryString(queryStr);
    const url = this.baseUrl + 'search/?format=json&q=' + query + '&sort=n&max=1&offset=0&api_key=' + this.apiKey;
    return this.http.get(url);
  }

  getNutrients(ndbno: string): Observable<any> {
    console.log("inside getNutrients");
    const url = this.baseUrl + 'reports/?ndbno=' + ndbno + '&type=b&format=json&api_key=' + this.apiKey;
    return this.http.get(url);
  }

  formatQueryString(queryStr: string): string {
    return queryStr.replace(" ", "%20");
  }

  getSearchByFood(queryStr: string): Observable<any> {
    console.log("inside getSearchByFood");
    const queryUrl = 'q=' + this.formatQueryString(queryStr);
    const apiType = 'search';
    const apiUrl = apiType + '/?';
    const sortType = 'r';
    const sortUrl = 'sort=' + sortType;
    const max = 1;
    const maxUrl = 'max=' + max;
    const url = this.baseUrl + apiUrl + queryUrl + '&' + sortUrl + '&' + maxUrl + '&' + this.apiKeyUrl;
    return this.http.get(url);
  }

  getSearchByFoodGroup(queryStr: string, foodGroup: string): Observable<any> {
    console.log("inside getSearchByFoodGroup");
    const queryUrl = 'q=' + this.formatQueryString(queryStr);
    const apiType = 'search';
    const apiUrl = apiType + '/?';
    const sortType = 'r';
    const sortUrl = 'sort=' + sortType;
    const max = 1;
    const maxUrl = 'max=' + max;
    const foodGroupUrl = 'fg=' + foodGroup;
    const url = this.baseUrl + apiUrl + queryUrl + '&' + sortUrl + '&' +
                  maxUrl + '&' + foodGroupUrl + '&' + this.apiKeyUrl;
    return this.http.get(url);
  }
}

//https://api.nal.usda.gov/ndb/search/?format=json&q=raw%20granny%20smith%20apple&sort=n&max=50&offset=0&api_key=EH6jWPD9LdlAPYrnQzR4luccqsnhUBwSd99kwocV';
//https://api.nal.usda.gov/ndb/reports/?ndbno=09502&type=b&format=json&api_key=EH6jWPD9LdlAPYrnQzR4luccqsnhUBwSd99kwocV
//https://api.nal.usda.gov/ndb/search/?format=json&q=chicken%20meat%20only%20raw&sort=r&max=50&offset=0&api_key=EH6jWPD9LdlAPYrnQzR4luccqsnhUBwSd99kwocV
