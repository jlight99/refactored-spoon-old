import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FoodGroup, Food, USDAFood, USDAMeasure } from '../../../../models/food.model';
import { UsdaService } from '../../../../services/usda/usda.service';
import { MatSelectChange, MatStepper } from '@angular/material';

@Component({
  selector: 'app-add-food',
  templateUrl: './add-food.component.html',
  styleUrls: ['./add-food.component.css']
})
export class AddFoodComponent implements OnInit {
  @Output() addFoodEmitter = new EventEmitter<Food>();

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
  shouldDisplayDropdowns: boolean = false;
  chooseFoodFormGroup: FormGroup;
  chooseAmountFormGroup: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private usdaService: UsdaService,
  ) { }

  ngOnInit() {
    this.chooseFoodFormGroup = this._formBuilder.group({ chooseFoodQueryFormCtrl: ['', Validators.required], chooseFoodNameFormCtrl: ['', Validators.required], chooseFoodGroupFormCtrl: ['', Validators.required] });
    this.chooseAmountFormGroup = this._formBuilder.group({ chooseMeasureFormCtrl: ['', Validators.required], chooseQuantityFormCtrl: ['1', Validators.required] });

    this.chooseFoodFormGroup.valueChanges
      .subscribe((value) => {
        this.chosenFood = value.chooseFoodNameFormCtrl;
        this.chosenFoodGroup = value.chooseFoodGroupFormCtrl;
      });

    this.chooseAmountFormGroup.valueChanges
      .subscribe((value) => {
        this.chosenMeasure = value.chooseMeasureFormCtrl;
        this.chosenQuantity = parseInt(value.chooseQuantityFormCtrl, 10);
      });

    this.getFoodGroups();
  }

  getFoodGroups(): void {
    this.usdaService.getFoodGroups().subscribe((foodgroupList) => {
      console.log("food groups");
      console.log(foodgroupList);
      foodgroupList.list.item.forEach((foodgroup) => {
        var mappedName = this.mapFoodGroupName(foodgroup.name);
        this.foodGroups.push({ name: mappedName, id: foodgroup.id });
      })
    })
  }

  mapFoodGroupName(name: string): string {
    switch(name) {
      case 'Dairy and Egg Products':
        return 'Dairy/Egg';
      case 'Finfish and Shellfish Products':
        return 'Seafood';
      case 'Fruits and Fruit Juices':
        return 'Fruit';
      case 'Legumes and Legume Products':
        return 'Legume';
      case 'Nut and Seed Products':
        return 'Nut/Seed';
      case 'Pork Products':
        return 'Pork';
      case 'Poultry Products':
        return 'Poultry';
      case 'Vegetables and Vegetable Products':
        return 'Vegetable';
    }
    return name;
  }

  submitFoodName() {
    this.usdaService.getSearchByFood(this.chooseFoodFormGroup.value.chooseFoodQueryFormCtrl).subscribe((res) => {
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
    this.usdaService.getNutrients(this.chosenFood.ndbno).subscribe((res) => {
      const retrievedMeasures = (Array.prototype.filter.call(res.report.food.nutrients, nutrient => nutrient.nutrient_id === "208"))[0].measures;

      Array.prototype.forEach.call(retrievedMeasures, (measure) => {
        this.measures.push(
          {
            label: measure.label,
            eqv: measure.eqv,
            eunit: measure.eunit,
            value: measure.value
          }
        );
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

  add(stepper: MatStepper) {
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
    this.reset(stepper);
  }

  reset(stepper: MatStepper) {
    this.queriedFoods = [];
    this.foodGroup = undefined;
    this.shouldDisplayDropdowns = false;
    this.measures = [];
    this.chooseFoodFormGroup.reset();
    this.chooseAmountFormGroup.reset();
    stepper.reset();
  }
}
