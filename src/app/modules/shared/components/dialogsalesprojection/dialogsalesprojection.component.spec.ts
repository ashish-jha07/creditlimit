import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogsalesprojectionComponent } from './dialogsalesprojection.component';

describe('DialogsalesprojectionComponent', () => {
  let component: DialogsalesprojectionComponent;
  let fixture: ComponentFixture<DialogsalesprojectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogsalesprojectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogsalesprojectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
