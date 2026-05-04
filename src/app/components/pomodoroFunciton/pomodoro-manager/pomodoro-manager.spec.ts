import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PomodoroManager } from './pomodoro-manager';

describe('PomodoroManager', () => {
  let component: PomodoroManager;
  let fixture: ComponentFixture<PomodoroManager>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PomodoroManager]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PomodoroManager);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
