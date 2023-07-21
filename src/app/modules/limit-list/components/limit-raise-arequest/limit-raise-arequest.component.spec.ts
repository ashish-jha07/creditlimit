import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LimitRaiseARequestComponent } from './limit-raise-arequest.component';

describe('LimitRaiseARequestComponent', () => {
  let component: LimitRaiseARequestComponent;
  let fixture: ComponentFixture<LimitRaiseARequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LimitRaiseARequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LimitRaiseARequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
