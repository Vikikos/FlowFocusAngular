import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescktopComponent } from './descktop';

describe('DescktopComponent', () => {
  let component: DescktopComponent;
  let fixture: ComponentFixture<DescktopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DescktopComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DescktopComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
