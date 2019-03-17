import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowCredsComponent } from './show-creds.component';

describe('ShowCredsComponent', () => {
  let component: ShowCredsComponent;
  let fixture: ComponentFixture<ShowCredsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowCredsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowCredsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
