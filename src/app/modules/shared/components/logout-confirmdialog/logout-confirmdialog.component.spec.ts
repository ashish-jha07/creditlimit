import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoutConfirmdialogComponent } from './logout-confirmdialog.component';

describe('LogoutConfirmdialogComponent', () => {
  let component: LogoutConfirmdialogComponent;
  let fixture: ComponentFixture<LogoutConfirmdialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogoutConfirmdialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoutConfirmdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
