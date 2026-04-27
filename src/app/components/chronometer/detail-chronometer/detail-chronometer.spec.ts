import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailChronometer } from './detail-chronometer';

describe('DetailChronometer', () => {
  let component: DetailChronometer;
  let fixture: ComponentFixture<DetailChronometer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailChronometer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailChronometer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
