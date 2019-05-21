import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MealService } from '../../../services/meal/meal.service';
import { Food, Dish } from '../../../models/food.model';

@Component({
  selector: 'app-meal-form',
  templateUrl: './meal-form.component.html',
  styleUrls: ['./meal-form.component.css']
})
export class MealFormComponent implements OnInit {
  @Output() newMealEmitter = new EventEmitter<string>();

  mealForm: FormGroup;

  mealTypes: string[] = ['breakfast', 'lunch', 'dinner', 'snack'];

  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  mealName: string;

  shouldDisplayAddFood: boolean = false;
  shouldDisplayAddDish: boolean = false;

  foods: Food[] = [];
  dishes: Dish[] = [];

  savedMeal: boolean = false;

  constructor(
    private _formBuilder: FormBuilder,
    private mealService: MealService
  ) { }

  ngOnInit() {
    this.mealForm = this._formBuilder.group({ chooseMealTypeCtrl: ['', Validators.required], chooseMealNameCtrl: ['', Validators.nullValidator]});
  
    this.mealForm.valueChanges.subscribe((value) => {
      this.mealName = value.chooseMealNameCtrl;
      this.mealType = value.chooseMealTypeCtrl;
    });
  }

  save() {
    const postedMeal = {
      name: this.mealName,
      type: this.mealType,
      dishes: this.dishes,
      foods: this.foods
    };

    this.mealService.postMeal(postedMeal).subscribe((res) => {
      console.log("postedMeal");
      console.log(postedMeal);
      this.savedMeal = true;
      this.newMealEmitter.emit(res);
    });
  }

  displayAddFood() {
    this.shouldDisplayAddFood = true;
  }

  displayAddDish() {
    this.shouldDisplayAddDish = true;
  }

  addFood(newFood: Food) {
    console.log("addFood()");
    console.log(newFood);
    this.foods.push(newFood);
    this.shouldDisplayAddFood = false;
  }

  addDish(newDish: Dish) {
    this.dishes.push(newDish);
  }
}
