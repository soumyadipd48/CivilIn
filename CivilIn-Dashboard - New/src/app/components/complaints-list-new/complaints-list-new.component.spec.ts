import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplaintsListNewComponent } from './complaints-list-new.component';

describe('ComplaintsListNewComponent', () => {
  let component: ComplaintsListNewComponent;
  let fixture: ComponentFixture<ComplaintsListNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComplaintsListNewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComplaintsListNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
