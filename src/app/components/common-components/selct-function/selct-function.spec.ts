import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelctFunction } from './selct-function';

describe('SelctFunction', () => {
  let component: SelctFunction;
  let fixture: ComponentFixture<SelctFunction>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelctFunction]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelctFunction);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
