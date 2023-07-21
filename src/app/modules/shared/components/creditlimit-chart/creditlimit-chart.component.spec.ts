import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditlimitChartComponent } from './creditlimit-chart.component';

describe('CreditlimitChartComponent', () => {
  let component: CreditlimitChartComponent;
  let fixture: ComponentFixture<CreditlimitChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreditlimitChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditlimitChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
