import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveySubmitPage } from './survey-submit.page';

describe('SurveySubmitPage', () => {
  let component: SurveySubmitPage;
  let fixture: ComponentFixture<SurveySubmitPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveySubmitPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveySubmitPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
