import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LimitDeshboardNewComponent } from './limit-deshboard-new.component';

describe('LimitDeshboardNewComponent', () => {
  let component: LimitDeshboardNewComponent;
  let fixture: ComponentFixture<LimitDeshboardNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LimitDeshboardNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LimitDeshboardNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
