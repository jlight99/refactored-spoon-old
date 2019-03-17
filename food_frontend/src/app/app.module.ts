import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FoodFormComponent } from './food-form/food-form.component';
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
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AddFoodComponent } from './add-food/add-food.component';
import { ShowRecordsComponent } from './show-records/show-records.component';
import { ShowCredsComponent } from './show-creds/show-creds.component';

@NgModule({
  declarations: [
    AppComponent,
    FoodFormComponent,
    AddFoodComponent,
    ShowRecordsComponent,
    ShowCredsComponent
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
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    FormBuilder
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
