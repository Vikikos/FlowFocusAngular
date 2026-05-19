import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardDesktopCalendar } from './card-desktop-calendar';

describe('CardDesktopCalendar', () => {
  let component: CardDesktopCalendar;
  let fixture: ComponentFixture<CardDesktopCalendar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardDesktopCalendar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardDesktopCalendar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
