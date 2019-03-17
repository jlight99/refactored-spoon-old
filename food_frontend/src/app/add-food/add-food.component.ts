import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FoodGroup, Food } from '../food.model';

@Component({
  selector: 'app-add-food',
  templateUrl: './add-food.component.html',
  styleUrls: ['./add-food.component.css']
})
export class AddFoodComponent {

  @Input() foodGroups: FoodGroup[];

  food: string;
  foodGroup: FoodGroup;
  quantity: number = 1;
  added: boolean = false;

  @Output() addedFood = new EventEmitter<Food>();

  add() {
    this.addedFood.emit(
      {
        value: this.food,
        description: "newly added food",
        foodGroup: this.foodGroup,
        calories: 0,
        quantity: this.quantity
      }
    );
    this.added = true;
  }
}
