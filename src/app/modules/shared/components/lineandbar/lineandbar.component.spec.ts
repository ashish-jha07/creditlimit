import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineandbarComponent } from './lineandbar.component';

describe('LineandbarComponent', () => {
  let component: LineandbarComponent;
  let fixture: ComponentFixture<LineandbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LineandbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LineandbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
