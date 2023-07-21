import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LimitDashboardComponent } from './limit-dashboard.component';

describe('LimitDashboardComponent', () => {
  let component: LimitDashboardComponent;
  let fixture: ComponentFixture<LimitDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LimitDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LimitDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
