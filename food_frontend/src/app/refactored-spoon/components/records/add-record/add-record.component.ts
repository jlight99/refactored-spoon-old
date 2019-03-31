import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FoodGroup, Food, USDAFood, USDAMeasure } from '../../../models/food.model';
import { FoodService } from '../../../services/food.service';
import { MatSelectChange } from '@angular/material';

@Component({
  selector: 'app-add-record',
  templateUrl: './add-record.component.html',
  styleUrls: ['./add-record.component.css']
})
export class AddRecordComponent implements OnInit {
  @Output() addFoodEmitter = new EventEmitter<Food>();
  @Output() getAllEmitter = new EventEmitter<boolean>();
  @Output() dateEmitter = new EventEmitter<Date>();
  @Output() mealEmitter = new EventEmitter<string>();

  foodGroups: FoodGroup[] = [];
  foodGroup: FoodGroup;
  unfilteredQueriedFoods: USDAFood[] = [];
  queriedFoods: USDAFood[] = [];
  unfilteredFoodGroups: string[] = [];
  queriedFoodGroups: string[] = [];
  chosenFood: USDAFood = null;
  chosenFoodGroup: string;
  chosenMeasure: USDAMeasure;
  chosenQuantity: number = 1;
  measures: USDAMeasure[] = [];
  shouldDisplayAdd: boolean = false;
  shouldDisplayDropdowns: boolean = false;
  chooseFoodFormGroup: FormGroup;
  chooseMeasureFormGroup: FormGroup;
  chooseQuantityFormGroup: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private foodService: FoodService,
  ) { }

  ngOnInit() {
    this.chooseFoodFormGroup = this._formBuilder.group({ chooseFoodQueryFormCtrl: ['', Validators.required], chooseFoodNameFormCtrl: ['', Validators.required], chooseFoodGroupFormCtrl: ['', Validators.required] });
    this.chooseMeasureFormGroup = this._formBuilder.group({ chooseMeasureFormCtrl: ['', Validators.required] });
    this.chooseQuantityFormGroup = this._formBuilder.group({ chooseQuantityFormCtrl: ['1', Validators.required] });

    this.chooseFoodFormGroup.valueChanges
      .subscribe((value) => {
        this.chosenFood = value.chooseFoodNameFormCtrl;
        this.chosenFoodGroup = value.chooseFoodGroupFormCtrl;
      })

    this.chooseMeasureFormGroup.valueChanges
      .subscribe((value) => {
        this.chosenMeasure = value.chooseMeasureFormCtrl;
      })

    this.chooseQuantityFormGroup.valueChanges
      .subscribe((value) => {
        this.chosenQuantity = parseInt(value.chooseQuantityFormCtrl, 10);
      })

    this.getFoodGroups();
  }

  displayAddFood() {
    this.shouldDisplayAdd = true;
  }

  setDate(newDate: Date) {
    this.dateEmitter.emit(newDate);
  }

  setMeal(newMeal: string) {
    this.mealEmitter.emit(newMeal);
  }

  getFoodGroups(): void {
    this.foodService.getFoodGroups().subscribe((foodgroupList) => {
      foodgroupList.list.item.forEach((foodgroup) => {
        this.foodGroups.push({ name: foodgroup.name, id: foodgroup.id });
      })
    })
  }

  submitFoodName() {
    this.foodService.getSearchByFood(this.chooseFoodFormGroup.value.chooseFoodQueryFormCtrl).subscribe((res) => {
      const foodResults = res.list.item;
      const filteredFoodResults = foodResults.filter(foodRes => foodRes.group !== "Branded Food Products Database");

      if (filteredFoodResults.length > 1) {
        this.shouldDisplayDropdowns = true;
        filteredFoodResults.forEach(foodResult => {
          this.queriedFoods.push(
            {
              name: foodResult.name,
              group: foodResult.group,
              ndbno: foodResult.ndbno
            }
          );
          if (!this.queriedFoodGroups.includes(foodResult.group)) {
            this.queriedFoodGroups.push(foodResult.group);
          }
        });
        this.unfilteredQueriedFoods = this.queriedFoods;
        this.unfilteredFoodGroups = this.queriedFoodGroups;
      }
    })
  }

  getMeasures() {
    this.foodService.getNutrients(this.chosenFood.ndbno).subscribe((res) => {
      const retrievedMeasures = (Array.prototype.filter.call(res.report.food.nutrients, nutrient => nutrient.nutrient_id === "208"))[0].measures;

      Array.prototype.forEach.call(retrievedMeasures, (measure) => {
        this.measures.push(
          {
            label: measure.label,
            eqv: measure.eqv,
            eunit: measure.eunit,
            value: measure.value
          }
        )
      });
    })
  }

  filterFoods(selectGroupsChange: MatSelectChange) {
    if (selectGroupsChange.value) {
      this.queriedFoods = this.unfilteredQueriedFoods.filter(queriedFood => queriedFood.group === selectGroupsChange.value);
    } else {
      this.queriedFoods = this.unfilteredQueriedFoods;
    }
  }

  filterFoodGroups(selectFoodChange: MatSelectChange) {
    if (selectFoodChange.value) {
      this.queriedFoodGroups = this.unfilteredFoodGroups.filter(queriedFoodGroup => queriedFoodGroup === selectFoodChange.value.group);
      this.chosenFoodGroup = this.queriedFoodGroups[1];
    } else {
      this.queriedFoodGroups = this.unfilteredFoodGroups;
    }
  }

  add() {
    const foodGroupId = this.foodGroups.filter(group => group.name === this.chosenFood.group)[0].id;
    this.addFoodEmitter.emit(
      {
        value: this.chosenFood.name,
        description: "newly added food",
        foodGroup: { name: this.chosenFood.group, id: foodGroupId },
        measure: { name: this.chosenMeasure.label, value: this.chosenMeasure.value },
        quantity: this.chosenQuantity,
        calories: parseInt(this.chosenMeasure.value, 10) * this.chosenQuantity
      }
    );
    this.reset();
    this.getAllEmitter.emit(true);
  }

  reset() {
    this.queriedFoods = [];
    this.foodGroup = undefined;
    this.shouldDisplayAdd = false;
    this.shouldDisplayDropdowns = false;
    this.measures = [];
    this.chooseFoodFormGroup.reset();
  }
}
