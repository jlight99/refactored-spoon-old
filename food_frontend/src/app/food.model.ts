export interface Food {
    value: string,
    description: string,
    // foodGroup: string,
    foodGroup: FoodGroup,
    calories: number,
    quantity: number
}
  
export interface FoodGroup {
    name: string,
    id: string
}

export interface Measure {
    label: string,
    eqv: number,
    eqvUnit: string,
    measureValue: string
}
  
export interface Meal {
    name: string,
    foods: Food[],
    restaurant: string
}
  
export interface Day {
    date: Date,
    meals: Meal[],
    totalCalories: number
}

export interface Month {
    value: number,
    viewValue: string
  }