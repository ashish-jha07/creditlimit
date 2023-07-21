import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LimitListComponent } from './limit-list.component';

describe('LimitListComponent', () => {
  let component: LimitListComponent;
  let fixture: ComponentFixture<LimitListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LimitListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LimitListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
