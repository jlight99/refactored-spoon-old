import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-refactored-spoon',
  templateUrl: './refactored-spoon.component.html',
  styleUrls: ['./refactored-spoon.component.css']
})
export class RefactoredSpoonComponent {
  @Input() title: string;
}