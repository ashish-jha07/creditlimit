import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommanDialogComponent } from './comman-dialog.component';

describe('CommanDialogComponent', () => {
  let component: CommanDialogComponent;
  let fixture: ComponentFixture<CommanDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommanDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommanDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
