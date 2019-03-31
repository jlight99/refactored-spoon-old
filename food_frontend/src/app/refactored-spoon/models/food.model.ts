export interface Food {
    value: string,
    description: string,
    foodGroup: FoodGroup,
    measure: Measure,
    quantity: number,
    calories: number
}

export interface FoodGroup {
    name: string,
    id: string
}

export interface Measure {
    name: string,
    value: string
}

export interface Meal {
    name: string,
    foods: Food[],
    restaurant: string,
    totalCalories: number
}

export interface Day {
    date: Date,
    meals: Meal[],
    totalCalories: number
}

export interface USDAFood {
    name: string,
    group: string,
    ndbno: string
}

export interface USDAMeasure {
    label: string,
    eqv: number,
    eunit: string,
    value: string
}