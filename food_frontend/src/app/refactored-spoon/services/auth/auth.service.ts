import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { SuccessNotificationService } from '../success-notification/success-notification.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl: string;

  constructor(
    private http: HttpClient,
    private router: Router,
    private successNotificationService: SuccessNotificationService
  ) {
    this.baseUrl = 'http://localhost:3000';
  }

  login(email: string, password: string) {
    return this.http.post(this.baseUrl + '/login', { email, password })
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      )
      .subscribe(
        (res) => {
          this.setSession(res);
          this.router.navigateByUrl('/records');
          this.successNotificationService.openSnackBarLogin('login', true);
        },
        (err) => {
          this.successNotificationService.openSnackBarLogin('login', false);
        })
  }

  signup(email: string, password: string) {
    return this.http.post(this.baseUrl + '/signup', { email, password })
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      )
      .subscribe(
        (res) => {
          this.successNotificationService.openSnackBarLogin('signup', true);
        },
        (err) => {
          this.successNotificationService.openSnackBarLogin('signup', false);
        }
      )
  }

  private setSession(authResult) {
    const expiresAt = moment().add(authResult.expiresIn, 'second');

    localStorage.setItem('id_token', authResult.token);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
  }

  logout() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    this.successNotificationService.openSnackBarLogin('logout', true);
    this.router.navigateByUrl('/');
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
