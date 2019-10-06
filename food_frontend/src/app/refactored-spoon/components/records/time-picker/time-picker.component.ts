import { Component, Output, OnInit, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-time-picker',
  templateUrl: './time-picker.component.html',
  styleUrls: ['./time-picker.component.css']
})
export class TimePickerComponent implements OnInit {
  @Output() dateSet = new EventEmitter<Date>();

  date: Date = new Date();
  dateControl = new FormControl((new Date()).toISOString());

  ngOnInit(): void {
    this.date = new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate(), 0, 0, 0);
    this.dateSet.emit(this.date);

    this.dateControl.valueChanges.subscribe(val => {
      this.date = val;
      this.dateSet.emit(this.date);
    });
  }
}
