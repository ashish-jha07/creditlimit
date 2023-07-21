import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScesuploadComponent } from './scesupload.component';

describe('ScesuploadComponent', () => {
  let component: ScesuploadComponent;
  let fixture: ComponentFixture<ScesuploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScesuploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScesuploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
