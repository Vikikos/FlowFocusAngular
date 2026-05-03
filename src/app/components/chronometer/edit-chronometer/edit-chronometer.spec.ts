import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditChronometer } from './edit-chronometer';

describe('EditChronometer', () => {
  let component: EditChronometer;
  let fixture: ComponentFixture<EditChronometer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditChronometer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditChronometer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
