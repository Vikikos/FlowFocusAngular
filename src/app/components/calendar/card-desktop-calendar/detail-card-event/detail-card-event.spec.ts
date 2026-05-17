import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailCardEvent } from './detail-card-event';

describe('DetailCardEvent', () => {
  let component: DetailCardEvent;
  let fixture: ComponentFixture<DetailCardEvent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailCardEvent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailCardEvent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
