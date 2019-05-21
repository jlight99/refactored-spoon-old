import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DayService } from 'src/app/refactored-spoon/services/day/day.service';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-add-record',
  templateUrl: './add-record.component.html',
  styleUrls: ['./add-record.component.css']
})
export class AddRecordComponent implements OnInit {
  date: Date;
  recordTypes: string[] = ['food', 'dish', 'meal'];
  recordForm: FormGroup;
  recordType: string;
  meals: string[] = [];
  shouldDisplayMealForm: boolean = false;

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
    console.log("saving record");
    this.dialogRef.close();

    this.dayService.updateDay(
      {
        date: this.date,
        meals: this.meals
      }
    ).subscribe((res) => {
      console.log("updated day res");
      console.log(res);
    })
  }

  close() {
    this.dialogRef.close();
  }

  addMeal(newMealId: string) {
    this.meals.push(newMealId);
  }

  openMealForm() {
    this.shouldDisplayMealForm = true;
  }
}
