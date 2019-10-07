export interface Food {
    value: string,
    description: string,
    foodGroup: FoodGroup,
    measure: Measure,
    quantity: number,
    calories: number
}

export interface Dish {
    name: string,
    description: string,
    ingredients: Food[]
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
    type: 'breakfast' | 'lunch' | 'dinner' | 'snack',
    dishes: Dish[],
    foods: Food[]
}

export interface Day {
    date: Date,
    meals: Meal[],
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

export interface UserInfo {
    username: string,
    password: string
}