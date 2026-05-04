import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCalendar } from './add-calendar';

describe('AddCalendar', () => {
  let component: AddCalendar;
  let fixture: ComponentFixture<AddCalendar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddCalendar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCalendar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
