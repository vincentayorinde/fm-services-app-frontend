import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WhyUsPage } from './why-us.page';

describe('WhyUsPage', () => {
  let component: WhyUsPage;
  let fixture: ComponentFixture<WhyUsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WhyUsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WhyUsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
