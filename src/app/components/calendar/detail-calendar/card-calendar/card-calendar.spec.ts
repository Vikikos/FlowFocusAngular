import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardCalendar } from './card-calendar';

describe('CardCalendar', () => {
  let component: CardCalendar;
  let fixture: ComponentFixture<CardCalendar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardCalendar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardCalendar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
