import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkingAreasPage } from './working-areas.page';

describe('WorkingAreasPage', () => {
  let component: WorkingAreasPage;
  let fixture: ComponentFixture<WorkingAreasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkingAreasPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkingAreasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
