import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { UserInfo } from 'src/app/refactored-spoon/models/food.model';
import { FormControl } from '@angular/forms';
import { MatTabChangeEvent } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  type: string;

  constructor(private authService: AuthService) {}

  submit(userInfo: UserInfo) {
    if (this.type === 'login') {
      if (userInfo.username && userInfo.password) {
        const loginResults = this.authService.login(userInfo.username, userInfo.password);
        console.log(loginResults);
      }
    } else if (this.type === 'sign up') {
      if (userInfo.username && userInfo.password) {//validate no repeat
        const signupResults = this.authService.signup(userInfo.username, userInfo.password);
        console.log(signupResults);
      }
    }
  }

  onTabChange(tabChangeEvent: MatTabChangeEvent) {
    this.type = tabChangeEvent.index === 0 ? 'login' : 'sign up';
  }
}
