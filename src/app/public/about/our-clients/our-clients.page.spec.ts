import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OurClientsPage } from './our-clients.page';

describe('OurClientsPage', () => {
  let component: OurClientsPage;
  let fixture: ComponentFixture<OurClientsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OurClientsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OurClientsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
