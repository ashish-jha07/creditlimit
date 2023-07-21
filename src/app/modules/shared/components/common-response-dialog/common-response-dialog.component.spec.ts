import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonResponseDialogComponent } from './common-response-dialog.component';

describe('CommonResponseDialogComponent', () => {
  let component: CommonResponseDialogComponent;
  let fixture: ComponentFixture<CommonResponseDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommonResponseDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonResponseDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
