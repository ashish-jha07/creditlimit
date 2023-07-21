import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerinvestmentComponent } from './partnerinvestment.component';

describe('PartnerinvestmentComponent', () => {
  let component: PartnerinvestmentComponent;
  let fixture: ComponentFixture<PartnerinvestmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartnerinvestmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnerinvestmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
