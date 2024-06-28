import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssistanceListNewComponent } from './assistance-list-new.component';

describe('AssistanceListNewComponent', () => {
  let component: AssistanceListNewComponent;
  let fixture: ComponentFixture<AssistanceListNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssistanceListNewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssistanceListNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
