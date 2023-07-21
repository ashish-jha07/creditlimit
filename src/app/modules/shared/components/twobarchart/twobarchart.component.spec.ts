import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwobarchartComponent } from './twobarchart.component';

describe('TwobarchartComponent', () => {
  let component: TwobarchartComponent;
  let fixture: ComponentFixture<TwobarchartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TwobarchartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TwobarchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
