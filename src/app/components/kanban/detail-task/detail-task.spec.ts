import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailTask } from './detail-task';

describe('DetailTask', () => {
  let component: DetailTask;
  let fixture: ComponentFixture<DetailTask>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailTask]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailTask);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
