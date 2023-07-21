import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogMasteruploadComponent } from './dialog-masterupload.component';

describe('DialogMasteruploadComponent', () => {
  let component: DialogMasteruploadComponent;
  let fixture: ComponentFixture<DialogMasteruploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogMasteruploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogMasteruploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
