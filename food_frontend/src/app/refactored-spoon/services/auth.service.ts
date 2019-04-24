import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl: string;

  constructor(private http: HttpClient, private router: Router) {
    this.baseUrl = 'http://localhost:3000';
  }

  login(username: string, password: string) {
    return this.http.post(this.baseUrl + '/login', {username, password})
      .subscribe((res) => {
        console.log("login.subscribe");
        this.setSession(res);
        return res;
      })
  }

  signup(username: string, password: string) {
    return this.http.post(this.baseUrl + '/signup', {username, password})
      .subscribe((res) => {
        console.log("signed up new user: " + username);
      })
  }

  private setSession(authResult) {
    const expiresAt = moment().add(authResult.expiresIn,'second');

    localStorage.setItem('id_token', authResult.token);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
  }

  logout() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
  }

  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  public isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration = localStorage.getItem('expires_at');
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }
}
