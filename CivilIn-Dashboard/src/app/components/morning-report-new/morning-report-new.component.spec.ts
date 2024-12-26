import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MorningReportNewComponent } from './morning-report-new.component';

describe('MorningReportNewComponent', () => {
  let component: MorningReportNewComponent;
  let fixture: ComponentFixture<MorningReportNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MorningReportNewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MorningReportNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
