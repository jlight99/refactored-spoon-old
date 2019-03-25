import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FoodGroup, Food, USDAFood, USDAMeasure } from '../food.model';
import { FoodService } from '../food.service';

@Component({
  selector: 'app-add-food',
  templateUrl: './add-food.component.html',
  styleUrls: ['./add-food.component.css']
})
export class AddFoodComponent implements OnInit {

  @Input() foodGroups: FoodGroup[];

  food: string;
  queriedFoods: USDAFood[] = [];
  chosenFood: USDAFood = null;
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
    this.chooseFoodFormGroup = this._formBuilder.group({chooseFoodFormCtrl: ['', Validators.required], chooseFoodNameFormCtrl: ['', Validators.required]});
    this.chooseMeasureFormGroup = this._formBuilder.group({chooseMeasureFormCtrl: ['', Validators.required]});
    this.chooseQuantityFormGroup = this._formBuilder.group({chooseQuantityFormCtrl: ['', Validators.required]});
  }

  reset() {
    this.food = "";
    this.queriedFoods = [];
    this.chosenFood = null;
    this.foodGroup = null;
    this.quantity = 1;
    this.displayAdd = false;
    this.displayFoodDropdown = false;
    this.measures = [];
    this.measure = null;
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
        });
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
}
