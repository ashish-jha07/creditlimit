import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadreportdetailComponent } from './downloadreportdetail.component';

describe('DownloadreportdetailComponent', () => {
  let component: DownloadreportdetailComponent;
  let fixture: ComponentFixture<DownloadreportdetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DownloadreportdetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadreportdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
