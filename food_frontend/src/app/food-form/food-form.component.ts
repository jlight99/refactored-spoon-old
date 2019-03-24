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

  public deleteDay(date: Date): void {
    this.dayService.deleteDay(new Date(date)).subscribe(() => {
      this.getAll();
      this.openSnackBar("deleted record of " + date, "deleted")
    });
  }

  public deleteAll(): void {
    this.dayService.deleteDays().subscribe(() => {
      this.getAll();
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
      date: this.getZeroedDate(this.date),
      meals: daysMeals,
      totalCalories: this.calculateTotalCalories(daysMeals).valueOf()
    }

    this.dayService.postDay(day).subscribe(() => {
      this.add = false;

      this.getAll();

      this.openSnackBar("created record of " + day.date, "created")
    })
  }

  public put(dayRecord: Day, newFood: Food): void {
    dayRecord.totalCalories = Number(dayRecord.totalCalories);
    dayRecord.meals.forEach((meal: Meal) => {
      if (meal.name.toLowerCase() === this.meal.toLowerCase()) {
        meal.foods.push(newFood);
        dayRecord.totalCalories += Number(newFood.calories);
      }
    });

    this.dayService.updateDay(dayRecord, this.getZeroedDate(dayRecord.date)).subscribe(() => {
      this.add = false;

      this.openSnackBar("updated record of " + dayRecord.date, "updated");

      this.getAll();
    })
  }

  public deleteFood(day: Day) {
    this.dayService.updateDay(day, new Date(day.date)).subscribe(() => {
      this.openSnackBar("updated record of " + day.date + " successfully deleted food", "deleted");
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

      this.dayService.getDay(this.date).subscribe((dayRecord: Day) => {
        if (!dayRecord) {
          console.log("posting");
            this.post(newFood);
          } else {
            console.log("putting");
            this.put(dayRecord, newFood);
          }
        })
      })
    })
  }

  public getZeroedDate(date: Date): Date {
    const newDate = new Date(date);
    return new Date(newDate.getFullYear(), newDate.getMonth(), newDate.getDate(), 0, 0, 0);
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
        totalCal = Number(food.calories) + totalCal;
      })
    });
    return totalCal;
  }

  public onMeasureChange(measureOpened: boolean) {

  }

  public openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {duration: 2000})
  }

}