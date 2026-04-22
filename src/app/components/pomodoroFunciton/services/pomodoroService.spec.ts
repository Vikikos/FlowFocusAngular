import { TestBed } from '@angular/core/testing';

import { PomodoroService } from './pomodoroService';

describe('PomodoroService', () => {
  let service: PomodoroService
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PomodoroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
