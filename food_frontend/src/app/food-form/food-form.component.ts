import { Component, OnInit } from '@angular/core';
import { DayService } from '../day.service';
import { FoodService } from '../food.service';
import { FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry, MatSelectChange, MatSnackBar } from '@angular/material';
import {
  Food,
  FoodGroup,
  Measure,
  Meal,
  Day,
} from '../food.model';

@Component({
  selector: 'app-food-form',
  templateUrl: './food-form.component.html',
  styleUrls: ['./food-form.component.css']
})
export class FoodFormComponent implements OnInit {
  public form: FormGroup;
  public meal: string;
  public recordMeal: Meal;
  public currentDate: Date = new Date();
  public day: number = this.getCurrentDay();
  public days: number[] = [];
  public month: number = this.getCurrentMonth();
  public year: number = this.getCurrentYear();
  public date: Date;
  public foodGroup: FoodGroup;
  public foodGroups: FoodGroup[] = [];
  public quantity: number = 1;
  public food: string;
  public add: boolean = false;
  public list: boolean = false;
  public dayRecords: Day[] = [];
  public dayRecord: Day;
  public usdaNdbno: string;
  public usdaFoodName: string;
  public usdaCaloricValue: string;
  public kcal: number;
  public foodDesc: string;
  public measure: Measure;
  public foodMeasures: Measure[];
  public measureFocused: boolean = false;
  public nutrients: Object[] = [];

  constructor(
    private dayService: DayService,
    private foodService: FoodService,
    private sanitizer: DomSanitizer,
    private iconRegistry: MatIconRegistry,
    private snackBar: MatSnackBar
  ) {
    iconRegistry.addSvgIcon(
      'garbage',
      sanitizer.bypassSecurityTrustResourceUrl('../../assets/images/garbage.svg')
    )
  }
  
  public ngOnInit(): void {
    this.getDays();
    this.getAll();
    this.getFoodGroups();
  }

  public setDate(newDate: Date) {
    this.date = newDate;
  }

  public setMeal(newMealStr: string) {
    this.meal = newMealStr;
  }

  public getFoodGroups(): void {
    this.foodService.getFoodGroups().subscribe((foodgroupList) => {
      foodgroupList.list.item.forEach((foodgroup) => {
        this.foodGroups.push({ name: foodgroup.name, id: foodgroup.id });
      })
    })
  }

  public getDays(): void {
    this.days.splice(0, this.days.length);
    var numDays = 31;
    if (this.month === 2) {
      if (this.year % 4 === 0 && (this.year % 100 !== 0 || this.year % 400 === 0)) {
        numDays = 29;
      } else {
        numDays = 28;
      }
    } else if (this.month === 4 || this.month === 6 || this.month === 9 || this.month === 11) {
      numDays = 30;
    }
    for (var i = 1; i <= numDays; i++) {
      this.days.push(i);
    }
  }

  public get(date: Date): void {
    this.dayService.getDay(date).subscribe((dayRecord: Day) => {
      this.dayRecord = dayRecord;
    })
  }

  public getAll(): void {
    this.dayService.getDays().subscribe((dayRecords: Day[]) => {
      this.dayRecords = dayRecords;
    })
  }

  public deleteOne(date: Date): void {
    this.dayService.deleteDay(new Date(date)).subscribe(() => {
      this.openSnackBar("deleted record of " + date, "deleted")
    });
  }

  public deleteAll(): void {
    this.dayService.deleteDays().subscribe(() => {
      this.openSnackBar("deleted all records", "deleted")
    });
  }

  public post(newFood: Food): void {
    var breakfast: Meal = {
      name: 'breakfast',
      foods: [],
      restaurant: undefined
    };
    var lunch: Meal = {
      name: 'lunch',
      foods: [],
      restaurant: undefined
    };
    var dinner: Meal = {
      name: 'dinner',
      foods: [],
      restaurant: undefined
    };

    if (this.meal.toLowerCase() === breakfast.name) {
      breakfast.foods.push(newFood);
    } else if (this.meal.toLowerCase() === lunch.name) {
      lunch.foods.push(newFood);
    } else if (this.meal.toLowerCase() === dinner.name) {
      dinner.foods.push(newFood);
    }

    var daysMeals: Meal[] = [breakfast, lunch, dinner];

    const day: Day = {
      date: new Date(this.year, this.month - 1, this.day, 0, 0, 0),
      meals: daysMeals,
      totalCalories: this.calculateTotalCalories(daysMeals)
    }

    this.dayService.postDay(day).subscribe(() => {
      this.add = false;

      this.getAll();

      this.openSnackBar("created record of " + day.date, "created")
    })
  }

  public put(dayRecord: Day, newFood: Food): void {
    dayRecord.meals.forEach((meal: Meal) => {
      if (meal.name.toLowerCase() === this.meal.toLowerCase()) {
        meal.foods.push(newFood);
        console.log("dayRecord");
        console.log(dayRecord);
        dayRecord.totalCalories += newFood.calories;
        console.log("dayRecord after");
        console.log(dayRecord);
      }
    });

    this.dayService.updateDay(dayRecord, new Date(dayRecord.date)).subscribe(() => {
      this.add = false;

      this.openSnackBar("updated record of " + dayRecord.date, "updated");

      this.getAll();
    })
  }

  public deleteFood(day: Day, meal: Meal, food: Food) {
    day.meals.forEach((currentMeal: Meal) => {
      if (currentMeal.name.toLowerCase() === meal.name.toLowerCase()) {
        meal.foods = meal.foods.filter(currentFood => currentFood.value !== food.value)
      }
    })

    this.dayService.updateDay(day, new Date(day.date)).subscribe(() => {
      this.openSnackBar("updated record of " + day.date + " successfully deleted food " + food.value +
                          " from meal " + meal.name, "updted");
      this.getAll();
    })
  }

  public getFoodNutrients() {
    this.foodService.getSearchByFoodGroup(this.food, this.foodGroup.id).subscribe((res) => {
      this.foodService.getNutrients(res.list.item[0].ndbno).subscribe((nutrientRes) => {

      })
    })
  }

  public record(addedFood: Food): void {
    this.food = addedFood.value;
    this.foodGroup = addedFood.foodGroup;
    this.quantity = addedFood.quantity;

    //this.foodService.getSearchByFood(this.food).subscribe((res) => {
    this.foodService.getSearchByFoodGroup(this.food, this.foodGroup.id).subscribe((res) => {
      const foodItem = res.list.item[0];
      //this.foodGroup = foodItem.group;
      this.foodService.getNutrients(foodItem.ndbno).subscribe((nutrientRes) => {
        console.log("nutrientRes");
        console.log(nutrientRes);
        var caloricReport;

        nutrientRes.report.food.nutrients.forEach((nutrient) => {
          if (nutrient.nutrient_id === "208") {
            caloricReport = nutrient;
          }
        })

        console.log("caloricReport");
        console.log(caloricReport);

        var foundMedium = false;

        caloricReport.measures.forEach((measure) => {
          console.log("measure");
          console.log(measure);
          if (measure.label.includes('medium')) {
            console.log("this measure includes medium!");
            this.kcal = measure.value;
            this.foodDesc = measure.label;
            foundMedium = true;
          }
        })

        if (!foundMedium) {
          this.kcal = caloricReport.measures[0].value;
          this.foodDesc = caloricReport.measures[0].label;
        }

        var newFood: Food = {
          value: this.food,
          description: this.foodDesc,
          foodGroup: this.foodGroup,
          calories: this.kcal,
          quantity: this.quantity
        }

        this.dayService.getDay(new Date(this.year, this.month - 1, this.day, 0, 0, 0)).subscribe((dayRecord: Day) => {
          if (!dayRecord) {
            this.post(newFood);
          } else {
            this.put(dayRecord, newFood);
          }
        })
      })
    })


  }

  public fieldsFilled() {
    if (this.meal && this.food && this.foodGroup) {
      return true;
    }
    return false;
  }

  public addFood() {
    this.add = true;
  }

  public formatDate(date: Date): string {
    return date.toDateString();
  }

  public getCurrentDay(): number {
    return this.currentDate.getDate();
  }

  public getCurrentMonth(): number {
    return this.currentDate.getMonth() + 1;
  }

  public getCurrentYear(): number {
    return this.currentDate.getFullYear();
  }

  public displayAdd(): boolean {
    return this.add;
  }

  public getDisplayDay(thing: JSON): string {
    return JSON.stringify(thing);
  }

  public calculateTotalCalories(meals: Meal[]) {
    var totalCal: number = 0;
    meals.forEach((meal: Meal) => {
      meal.foods.forEach((food: Food) => {
        console.log("food");
        console.log(food);
        console.log("totalCal");
        console.log(totalCal);
        totalCal += food.calories;
      })
    });
    return totalCal;
  }

  public onMonthChange(event: MatSelectChange) {
    this.getDays();
  }

  public onYearChange(event: MatSelectChange) {
    this.getDays();
  }

  public onMeasureChange(measureOpened: boolean) {

  }

  public openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {duration: 2000})
  }

  public getFoodCalories(food: string) {
    console.log("getFoodCalories");
    this.foodService.getSearchByFood(food).subscribe((res) => {
      const foodItem = res.list.item[0];
      console.log("foodItem");
      console.log(foodItem);
      this.foodService.getNutrients(foodItem.ndbno).subscribe((nutrientRes) => {
        console.log("nutrientRes");
        console.log(nutrientRes);
        const caloricReport = nutrientRes.report.food.nutrients[1];
        console.log("caloricReport");
        console.log(caloricReport);
        caloricReport.measures.forEach((measure) => {
          console.log("measure.label");
          console.log(measure.label);
          if (measure.label === 'medium') {
            this.kcal = measure.value;
          }
        })
      })
    })
  }

  public getFromDB(food: string) {
    console.log("the food");
    console.log(food);
    this.foodService.getNdbno(food).subscribe((ndbnoRes) => {
      const foodItem = ndbnoRes.list.item[0];
      console.log(foodItem.name);
      this.usdaFoodName = foodItem.name;
      console.log(foodItem.ndbno);
      this.usdaNdbno = foodItem.ndbno;
      this.foodService.getNutrients(foodItem.ndbno).subscribe((nutrientRes) => {
        const caloricReport = nutrientRes.report.food.nutrients[1];
        console.log("caloricReport");
        console.log(caloricReport);
        console.log("calories per 100g");
        console.log(caloricReport.value);
        this.usdaCaloricValue = caloricReport.value;
      })
    })
  }

  public searchFood() {
    this.getFromDB(this.food);
  }
}