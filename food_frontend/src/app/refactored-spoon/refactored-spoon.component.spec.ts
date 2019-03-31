import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RefactoredSpoonComponent } from './refactored-spoon.component';

describe('RefactoredSpoonComponent', () => {
  let component: RefactoredSpoonComponent;
  let fixture: ComponentFixture<RefactoredSpoonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RefactoredSpoonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RefactoredSpoonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
