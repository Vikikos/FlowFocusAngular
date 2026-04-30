import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarksForm } from './marks-form';

describe('MarksForm', () => {
  let component: MarksForm;
  let fixture: ComponentFixture<MarksForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarksForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarksForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
