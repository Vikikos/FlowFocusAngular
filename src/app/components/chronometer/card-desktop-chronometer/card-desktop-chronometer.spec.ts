import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardDesktopChronometer } from './card-desktop-chronometer';

describe('CardDesktopChronometer', () => {
  let component: CardDesktopChronometer;
  let fixture: ComponentFixture<CardDesktopChronometer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardDesktopChronometer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardDesktopChronometer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
