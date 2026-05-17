import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressColumn } from './progress-column';

describe('ProgressColumn', () => {
  let component: ProgressColumn;
  let fixture: ComponentFixture<ProgressColumn>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgressColumn]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgressColumn);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
