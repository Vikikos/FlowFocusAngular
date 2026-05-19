import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardDesktopNote } from './card-desktop-note';

describe('CardDesktopNote', () => {
  let component: CardDesktopNote;
  let fixture: ComponentFixture<CardDesktopNote>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardDesktopNote]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardDesktopNote);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
