import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineandbarwithoneyaxisComponent } from './lineandbarwithoneyaxis.component';

describe('LineandbarwithoneyaxisComponent', () => {
  let component: LineandbarwithoneyaxisComponent;
  let fixture: ComponentFixture<LineandbarwithoneyaxisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LineandbarwithoneyaxisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LineandbarwithoneyaxisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
