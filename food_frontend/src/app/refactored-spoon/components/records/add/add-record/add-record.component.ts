import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DayService } from 'src/app/refactored-spoon/services/day/day.service';
import { MatDialogRef } from '@angular/material';
import { Meal } from 'src/app/refactored-spoon/models/food.model';

@Component({
  selector: 'app-add-record',
  templateUrl: './add-record.component.html',
  styleUrls: ['./add-record.component.css']
})
export class AddRecordComponent implements OnInit {
  addRecordEmitter = new EventEmitter<boolean>();

  date: Date;
  recordTypes: string[] = ['food', 'dish', 'meal'];
  recordForm: FormGroup;
  recordType: string;
  meals: Meal[] = [];

  constructor(
    private dialogRef: MatDialogRef<AddRecordComponent>,
    private _formBuilder: FormBuilder,
    private dayService: DayService
  ) { }

  ngOnInit() {
    // this.recordForm = this._formBuilder.group({ chooseReportTypeCtrl: ['', Validators.nullValidator] });
    this.recordForm = this._formBuilder.group({ chooseMealCtrl: ['', Validators.nullValidator] });

    this.recordForm.valueChanges.subscribe((value) => {
      //this.recordType = value.chooseRecordNameCtrl;
      if (value.chooseMealCtrl) {
        this.addMeal(value.chooseMealCtrl);
      }
    });
  }

  setDate(newDate: Date) {
    this.date = newDate;
  }

  save() {
    this.dialogRef.close();

    this.dayService.getDay(this.date).subscribe(() => {
      this.dayService.updateDay(
        {
          date: this.date,
          meals: this.meals
        }
      ).subscribe(() => {
        this.addRecordEmitter.emit(true);
      })
    })
  }

  close() {
    this.dialogRef.close();
  }

  addMeal(newMeal: Meal) {
    this.dayService.getDay(this.date).subscribe((day) => {
      if (day != null) {
        this.meals = day.meals.concat(this.meals);
      }
      this.meals.forEach((meal: Meal) => {
        if (meal.type == newMeal.type) {
          newMeal.foods = meal.foods.concat(newMeal.foods);
          newMeal.dishes = meal.dishes.concat(newMeal.dishes);
          this.meals = this.meals.filter((currentMeal) => currentMeal.type != newMeal.type);
        }
      });
      this.meals.push(newMeal);
    })
  }
}
