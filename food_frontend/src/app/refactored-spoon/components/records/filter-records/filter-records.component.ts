import { Component, OnInit } from '@angular/core';
import { FilterRecordsService } from '../../../services/filter-records.service';

@Component({
  selector: 'app-filter-records',
  templateUrl: './filter-records.component.html',
  styleUrls: ['./filter-records.component.css']
})
export class FilterRecordsComponent implements OnInit {
  shouldDisplayFilters: boolean = false;
  sortTypes: string[] = ["date", "calories"];
  // chosenSortType: string = 'date' | 'calories'; string safe???
  chosenSortType: string;

  constructor(public filterRecordsService: FilterRecordsService) { }

  ngOnInit() {
  }

  toggleDisplayFilters() {
    this.shouldDisplayFilters = !this.shouldDisplayFilters;
  }

  toggleSort() {
    // date: most recent vs. least recent, calories: highest vs. lowest
    // display dropdown of date / calories
  }

  onSortTypeChange(chosenSort: string) {
    this.chosenSortType = chosenSort;
  }

  //either this.chosenSortType must be defined for toggleSort() to proceed or it assumes a default

  //wonder if filter logic should be in a service
}
