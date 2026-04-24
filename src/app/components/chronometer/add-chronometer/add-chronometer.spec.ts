import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddChronometer } from './add-chronometer';

describe('AddChronometer', () => {
  let component: AddChronometer;
  let fixture: ComponentFixture<AddChronometer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddChronometer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddChronometer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
