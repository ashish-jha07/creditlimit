import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproverlistdataComponent } from './approverlistdata.component';

describe('ApproverlistdataComponent', () => {
  let component: ApproverlistdataComponent;
  let fixture: ComponentFixture<ApproverlistdataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproverlistdataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproverlistdataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
