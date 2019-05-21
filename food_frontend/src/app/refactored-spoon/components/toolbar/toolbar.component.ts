import { Component, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {
  @Output() displaySidenavEmitter = new EventEmitter<boolean>();
  displaySnav: boolean = false;

  constructor(
    private authService: AuthService
  ) { }

  logout() {
    this.authService.logout();
  }

  shouldDisplayLogout() {
    return this.authService.isLoggedIn();
  }

  toggleDisplaySnav() {
    this.displaySnav = !this.displaySnav;
    this.displaySidenavEmitter.emit(this.displaySnav);
  }
}
