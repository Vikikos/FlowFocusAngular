import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCalendar } from './edit-calendar';

describe('EditCalendar', () => {
  let component: EditCalendar;
  let fixture: ComponentFixture<EditCalendar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditCalendar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditCalendar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
