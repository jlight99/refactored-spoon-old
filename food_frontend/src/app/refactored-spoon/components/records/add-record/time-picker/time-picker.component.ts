import { Component, Output, OnInit, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-time-picker',
  templateUrl: './time-picker.component.html',
  styleUrls: ['./time-picker.component.css']
})
export class TimePickerComponent implements OnInit {
  @Output() dateSet = new EventEmitter<Date>();
  @Output() mealSet = new EventEmitter<string>();

  date: Date = new Date();
  dateControl = new FormControl((new Date()).toISOString());

  meal: string = 'Breakfast';
  meals: string[] =[
    'Breakfast', 'Lunch', 'Dinner'
  ];
  mealControl = new FormControl(this.meal);

  ngOnInit(): void {
    this.setDate();
    this.setMeal();

    const tmzOffsetMillisec = this.date.getTimezoneOffset() * 60 * 1000;
    const utcMillisec = this.date.getTime();
    const tmzDate = new Date(utcMillisec - tmzOffsetMillisec);
  
    this.date = tmzDate;

    this.dateControl.valueChanges.subscribe(val => {
      this.date = val;
      this.setDate();
    });

    this.mealControl.valueChanges.subscribe(val => {
      this.meal = val;
      this.setMeal();
    });
  }

  setDate() {
    this.dateSet.emit(this.date);
  }

  setMeal() {
    this.mealSet.emit(this.meal);
  }
}
