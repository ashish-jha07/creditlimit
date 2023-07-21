import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LimitlistdataComponent } from './limitlistdata.component';

describe('LimitlistdataComponent', () => {
  let component: LimitlistdataComponent;
  let fixture: ComponentFixture<LimitlistdataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LimitlistdataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LimitlistdataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
