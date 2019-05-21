import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string = "refactored spoon";
  shouldDisplaySidenav: boolean = false;
  opened: boolean;

  shouldOpenSidenav(open: boolean) {
    this.shouldDisplaySidenav = open;
  }
}
