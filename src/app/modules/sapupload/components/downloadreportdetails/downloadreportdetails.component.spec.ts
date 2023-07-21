import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadreportdetailsComponent } from './downloadreportdetails.component';

describe('DownloadreportdetailsComponent', () => {
  let component: DownloadreportdetailsComponent;
  let fixture: ComponentFixture<DownloadreportdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DownloadreportdetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadreportdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
