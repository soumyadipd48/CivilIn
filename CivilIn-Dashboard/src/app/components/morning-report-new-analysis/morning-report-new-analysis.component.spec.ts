import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MorningReportNewAnalysisComponent } from './morning-report-new-analysis.component';

describe('MorningReportNewAnalysisComponent', () => {
  let component: MorningReportNewAnalysisComponent;
  let fixture: ComponentFixture<MorningReportNewAnalysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MorningReportNewAnalysisComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MorningReportNewAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
