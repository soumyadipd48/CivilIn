import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrpsListComponent } from './grps-list.component';

describe('GrpsListComponent', () => {
  let component: GrpsListComponent;
  let fixture: ComponentFixture<GrpsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrpsListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GrpsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
