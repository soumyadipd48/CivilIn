import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MorningReportViewOnlyComponent } from './morning-report-view-only.component';

describe('MorningReportViewOnlyComponent', () => {
  let component: MorningReportViewOnlyComponent;
  let fixture: ComponentFixture<MorningReportViewOnlyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MorningReportViewOnlyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MorningReportViewOnlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
