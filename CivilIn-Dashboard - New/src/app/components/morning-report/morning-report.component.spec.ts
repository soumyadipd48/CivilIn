import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MorningReportComponent } from './morning-report.component';

describe('MorningReportComponent', () => {
  let component: MorningReportComponent;
  let fixture: ComponentFixture<MorningReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MorningReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MorningReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
