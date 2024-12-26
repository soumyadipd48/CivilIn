import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplaintsWebComponent } from './complaints-web.component';

describe('ComplaintsWebComponent', () => {
  let component: ComplaintsWebComponent;
  let fixture: ComponentFixture<ComplaintsWebComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComplaintsWebComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComplaintsWebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
