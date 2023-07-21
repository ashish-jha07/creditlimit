import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SapuploadComponent } from './sapupload.component';

describe('SapuploadComponent', () => {
  let component: SapuploadComponent;
  let fixture: ComponentFixture<SapuploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SapuploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SapuploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
