import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwolineandonebarComponent } from './twolineandonebar.component';

describe('TwolineandonebarComponent', () => {
  let component: TwolineandonebarComponent;
  let fixture: ComponentFixture<TwolineandonebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TwolineandonebarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TwolineandonebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
