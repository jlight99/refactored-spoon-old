import { Component, OnInit, ViewChild } from '@angular/core';
import { Day } from '../../models/food.model';
import { DayService } from '../../services/day/day.service';
import { SuccessNotificationService } from '../../services/success-notification/success-notification.service';
import { MatSort, MatTableDataSource, MatPaginator, MatDialog, MatDialogConfig } from '@angular/material';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { AddRecordComponent } from './add/add-record/add-record.component';

interface DayRecordDisplay {
  record: Day,
  expanded: boolean
}

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class RecordsComponent implements OnInit {
  dayRecords: Day[] = [];
  dayRecordDisplays: DayRecordDisplay[] = [];
  meal: string;
  food: string;
  add: boolean = false;
  date: Date;
  expandedElement: Day | null;

  dayColumns: string[] = ['date', 'delete', 'expand'];

  dataSource = new MatTableDataSource<Day>();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    public dayService: DayService,
    public successNotificationService: SuccessNotificationService,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.getAll();
  }

  getAll(): void {
    console.log("getAll()");
    this.dayService.getDays().subscribe((records: Day[]) => {
      this.dayRecords = records;
      console.log("dayRecords");
      console.log(this.dayRecords);
      this.initializeDisplayRecords();
      this.configureDataSource();
      this.dataSource.data = records;
    })
  }

  refresh(): void {
    this.getAll();
  }

  initializeDisplayRecords(): void {
    this.dayRecords.forEach((dayRecord: Day) => {
      this.dayRecordDisplays.push({record: dayRecord, expanded: false})
    })
  }

  configureDataSource(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  deleteDay(date: Date): void {
    this.dayService.deleteDay(new Date(date)).subscribe(() => {
      this.getAll();
      this.successNotificationService.openSnackBarDayRecord(date, "deleted")
    });
  }

  setDate(newDate: Date) {
    this.date = newDate;
  }

  setMeal(newMealStr: string) {
    this.meal = newMealStr;
  }

  toggleExpandedElement(day: Day): void {
    this.expandedElement = this.expandedElement === day ? null : day;
    const expandedRecordDisplay = this.dayRecordDisplays.filter((dayRecordDisplay: DayRecordDisplay) => dayRecordDisplay.record === day)[0];
    expandedRecordDisplay.expanded = !expandedRecordDisplay.expanded;
    /* if a record is expanded, all other records should be closed */
    if (expandedRecordDisplay.expanded) {
      this.dayRecordDisplays
        .filter((dayRecordDisplay: DayRecordDisplay) => dayRecordDisplay.record.date !== day.date)
        .forEach((dayRecordDisplay: DayRecordDisplay) => {
          dayRecordDisplay.expanded = false;
        })
    }
  }

  shouldExpand(date: Date): boolean {
    return this.dayRecordDisplays.filter((dayRecordDisplay: DayRecordDisplay) => dayRecordDisplay.record.date === date)[0].expanded;
  }

  openAddMeal() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.restoreFocus = false;
    this.dialog.open(AddRecordComponent, dialogConfig)
            .componentInstance.addRecordEmitter.subscribe(() => {
              console.log("add record emitter subscribe");
              this.getAll();
            });
    
  }

  deleteAll() {
    this.dayService.deleteDays().subscribe(() => {
      console.log("deleted all day records from frontend");
    })
  }
}
