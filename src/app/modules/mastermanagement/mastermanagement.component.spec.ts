import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MastermanagementComponent } from './mastermanagement.component';

describe('MastermanagementComponent', () => {
  let component: MastermanagementComponent;
  let fixture: ComponentFixture<MastermanagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MastermanagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MastermanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
