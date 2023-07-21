import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLimitModalComponent } from './add-limit-modal.component';

describe('AddLimitModalComponent', () => {
  let component: AddLimitModalComponent;
  let fixture: ComponentFixture<AddLimitModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddLimitModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLimitModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
