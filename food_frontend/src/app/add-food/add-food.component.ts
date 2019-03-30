import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FoodGroup, Food, USDAFood, USDAMeasure } from '../food.model';
import { FoodService } from '../food.service';
import { MatSelectChange } from '@angular/material';

@Component({
  selector: 'app-add-food',
  templateUrl: './add-food.component.html',
  styleUrls: ['./add-food.component.css']
})
export class AddFoodComponent implements OnInit {

  @Input() foodGroups: FoodGroup[];

  food: string;
  unfilteredQueriedFoods: USDAFood[] = [];
  queriedFoods: USDAFood[] = [];
  unfilteredFoodGroups: string[] = [];
  queriedFoodGroups: string[] = [];
  chosenFood: USDAFood = null;
  chosenFoodGroup: string;
  foodGroup: FoodGroup;
  quantity: number = 1;
  measures: USDAMeasure[] = [];
  measure: USDAMeasure;
  displayAdd: boolean = false;
  displayFoodDropdown: boolean = false;
  chooseFoodFormGroup: FormGroup;
  chooseMeasureFormGroup: FormGroup;
  chooseQuantityFormGroup: FormGroup;

  @Output() addedFood = new EventEmitter<Food>();

  constructor(
    private _formBuilder: FormBuilder,
    private foodService: FoodService,
  ) {}

  ngOnInit() {
    this.chooseFoodFormGroup = this._formBuilder.group({chooseFoodQueryFormCtrl: ['', Validators.required], chooseFoodNameFormCtrl: ['', Validators.required], chooseFoodGroupFormCtrl: ['', Validators.required]});
    this.chooseMeasureFormGroup = this._formBuilder.group({chooseMeasureFormCtrl: ['', Validators.required]});
    this.chooseQuantityFormGroup = this._formBuilder.group({chooseQuantityFormCtrl: ['1', Validators.required]});

    this.chooseFoodFormGroup.valueChanges
        .subscribe((value) => {
          this.food = value.chooseFoodQueryFormCtrl;
          this.chosenFood = value.chooseFoodNameFormCtrl;
          this.chosenFoodGroup = value.chooseFoodGroupFormCtrl;
        })

    this.chooseMeasureFormGroup.valueChanges
        .subscribe((value) => {
          this.measure = value.chooseMeasureFormCtrl;
        })

    this.chooseQuantityFormGroup.valueChanges
        .subscribe((value) => {
          this.quantity = parseInt(value.chooseQuantityFormCtrl, 10);
        })
  }

  reset() {
    this.food = "";
    this.queriedFoods = [];
    this.chosenFood = undefined;
    this.foodGroup = undefined;
    this.quantity = 1;
    this.displayAdd = false;
    this.displayFoodDropdown = false;
    this.measures = [];
    this.measure = undefined;
    this.chooseFoodFormGroup.reset();
  }

  submitFoodName() {
    this.foodService.getSearchByFood(this.food).subscribe((res) => {
      const foodResults = res.list.item;
      const filteredFoodResults = foodResults.filter(foodRes => foodRes.group !== "Branded Food Products Database");

      if (filteredFoodResults.length > 1) {
        this.displayFoodDropdown = true;
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
      } else {
        this.chosenFood = foodResults[0].name;
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

  add() {
    const foodGroupId = this.foodGroups.filter(group => group.name === this.chosenFood.group)[0].id;
    this.addedFood.emit(
      {
        value: this.chosenFood.name,
        description: "newly added food",
        foodGroup: {name: this.chosenFood.group, id: foodGroupId},
        measure: {name: this.measure.label, value: this.measure.value},
        quantity: this.quantity,
        calories: parseInt(this.measure.value, 10) * this.quantity
      }
    );
    this.reset();
  }

  addFood() {
    this.displayAdd = true;
  }

  filterFoods(selectGroupsChange: MatSelectChange) {
    if (selectGroupsChange.value) {
      this.queriedFoods = this.unfilteredQueriedFoods.filter(queriedFood => queriedFood.group === selectGroupsChange.value);
    }
  }

  filterFoodGroups(selectFoodChange: MatSelectChange) {
    if (selectFoodChange.value) {
      this.queriedFoodGroups = this.unfilteredFoodGroups.filter(queriedFoodGroup => queriedFoodGroup === selectFoodChange.value.group);
      this.chosenFoodGroup = this.queriedFoodGroups[0];
    }
  }
}
