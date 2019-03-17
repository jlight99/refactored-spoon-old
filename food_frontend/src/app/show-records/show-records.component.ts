import { Component, OnInit, Input, Output } from '@angular/core';
import { Day } from '../food.model';

@Component({
  selector: 'app-show-records',
  templateUrl: './show-records.component.html',
  styleUrls: ['./show-records.component.css']
})
export class ShowRecordsComponent {
  @Input() dayRecords: Day[];

  foodColumns: string[] = ['value', 'foodGroup', 'calories', 'quantity', 'delete'];

}
