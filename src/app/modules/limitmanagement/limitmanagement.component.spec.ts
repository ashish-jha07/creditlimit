import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LimitmanagementComponent } from './limitmanagement.component';

describe('LimitmanagementComponent', () => {
  let component: LimitmanagementComponent;
  let fixture: ComponentFixture<LimitmanagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LimitmanagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LimitmanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
