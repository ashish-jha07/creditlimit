import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DummyDaskboardComponent } from './dummy-daskboard.component';

describe('DummyDaskboardComponent', () => {
  let component: DummyDaskboardComponent;
  let fixture: ComponentFixture<DummyDaskboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DummyDaskboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DummyDaskboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
