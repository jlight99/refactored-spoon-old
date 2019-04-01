import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterRecordsComponent } from './filter-records.component';

describe('FilterRecordsComponent', () => {
  let component: FilterRecordsComponent;
  let fixture: ComponentFixture<FilterRecordsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterRecordsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
