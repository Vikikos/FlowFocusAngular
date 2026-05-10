import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailEvent } from './detail-event';

describe('DetailEvent', () => {
  let component: DetailEvent;
  let fixture: ComponentFixture<DetailEvent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailEvent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailEvent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
