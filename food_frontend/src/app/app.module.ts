import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RefactoredSpoonComponent } from './refactored-spoon/refactored-spoon.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatRadioModule } from '@angular/material/radio';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AddFoodComponent } from './refactored-spoon/components/records/add/add-food/add-food.component'
import { RecordsComponent } from './refactored-spoon/components/records/records.component';
import { CredsComponent } from './refactored-spoon/components/creds/creds.component';
import { MatNativeDateModule, NativeDateAdapter } from '@angular/material';
import { TimePickerComponent } from './refactored-spoon/components/records/time-picker/time-picker.component';
import { DayRecordComponent } from './refactored-spoon/components/records/day-record/day-record.component';
import { GoogleChartComponent } from './refactored-spoon/components/google-chart/google-chart.component';
import { SuccessNotificationMessagePipe } from './refactored-spoon/pipes/success-notification-message.pipe';
import { DeleteConfirmationComponent } from './refactored-spoon/components/delete-confirmation/delete-confirmation.component';
import { ConfirmationDialogComponent } from './refactored-spoon/components/confirmation-dialog/confirmation-dialog.component';
import { LoginComponent } from './refactored-spoon/components/user/login/login.component';
import { UserInfoComponent } from './refactored-spoon/components/user/user-info/user-info.component';
import { ToolbarComponent } from './refactored-spoon/components/toolbar/toolbar.component';
import { AuthInterceptor } from './refactored-spoon/auth.interceptor';
import { MealFormComponent } from './refactored-spoon/components/meals/meal-form/meal-form.component';
import { SideMenuComponent } from './refactored-spoon/components/side-menu/side-menu.component';
import { MealComponent } from './refactored-spoon/components/meals/meal/meal.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MealsComponent } from './refactored-spoon/components/meals/meals/meals.component';
import { AddRecordComponent } from './refactored-spoon/components/records/add/add-record/add-record.component';
import { AddMealComponent } from './refactored-spoon/components/meals/add-meal/add-meal.component';

@NgModule({
  declarations: [
    AppComponent,
    RefactoredSpoonComponent,
    AddFoodComponent,
    RecordsComponent,
    CredsComponent,
    TimePickerComponent,
    DayRecordComponent,
    GoogleChartComponent,
    SuccessNotificationMessagePipe,
    DeleteConfirmationComponent,
    ConfirmationDialogComponent,
    LoginComponent,
    UserInfoComponent,
    ToolbarComponent,
    MealFormComponent,
    SideMenuComponent,
    MealComponent,
    MealsComponent,
    AddRecordComponent,
    AddMealComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatExpansionModule,
    MatRadioModule,
    MatTableModule,
    MatIconModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatCardModule,
    MatTooltipModule,
    MatInputModule,
    MatListModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatStepperModule,
    MatSortModule,
    MatPaginatorModule,
    MatDialogModule,
    MatTabsModule,
    MatSidenavModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    FormBuilder,
    { provide: NativeDateAdapter, useClass: NativeDateAdapter },
    SuccessNotificationMessagePipe,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
  entryComponents: [ConfirmationDialogComponent, AddRecordComponent, AddMealComponent]
})
export class AppModule { }
