import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailCalendar } from './detail-calendar';

describe('DetailCalendar', () => {
  let component: DetailCalendar;
  let fixture: ComponentFixture<DetailCalendar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailCalendar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailCalendar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
