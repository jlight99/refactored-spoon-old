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
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AddRecordComponent } from './refactored-spoon/components/records/add-record/add-record.component'
import { RecordsComponent } from './refactored-spoon/components/records/records.component';
import { CredsComponent } from './refactored-spoon/components/creds/creds.component';
import { MatNativeDateModule, NativeDateAdapter } from '@angular/material';
import { TimePickerComponent } from './refactored-spoon/components/records/add-record/time-picker/time-picker.component';
import { DayRecordComponent } from './refactored-spoon/components/records/day-record/day-record.component';
import { GoogleChartComponent } from './refactored-spoon/components/google-chart/google-chart.component';
import { SuccessNotificationMessagePipe } from './refactored-spoon/pipes/success-notification-message.pipe';
import { DeleteConfirmationComponent } from './refactored-spoon/components/delete-confirmation/delete-confirmation.component';
import { ConfirmationDialogComponent } from './refactored-spoon/components/confirmation-dialog/confirmation-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    RefactoredSpoonComponent,
    AddRecordComponent,
    RecordsComponent,
    CredsComponent,
    TimePickerComponent,
    DayRecordComponent,
    GoogleChartComponent,
    SuccessNotificationMessagePipe,
    DeleteConfirmationComponent,
    ConfirmationDialogComponent
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
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    FormBuilder,
    {provide: NativeDateAdapter, useClass: NativeDateAdapter},
    SuccessNotificationMessagePipe
  ],
  bootstrap: [AppComponent],
  entryComponents: [ConfirmationDialogComponent]
})
export class AppModule { }
