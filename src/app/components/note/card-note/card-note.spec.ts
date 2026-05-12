import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardNote } from './card-note';

describe('CardNote', () => {
  let component: CardNote;
  let fixture: ComponentFixture<CardNote>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardNote]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardNote);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
