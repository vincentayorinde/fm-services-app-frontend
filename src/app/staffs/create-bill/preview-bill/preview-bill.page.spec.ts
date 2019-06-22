import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewBillPage } from './preview-bill.page';

describe('PreviewBillPage', () => {
  let component: PreviewBillPage;
  let fixture: ComponentFixture<PreviewBillPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreviewBillPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewBillPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
