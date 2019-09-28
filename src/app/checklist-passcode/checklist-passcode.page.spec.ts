import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChecklistPasscodePage } from './checklist-passcode.page';

describe('ChecklistPasscodePage', () => {
  let component: ChecklistPasscodePage;
  let fixture: ComponentFixture<ChecklistPasscodePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChecklistPasscodePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChecklistPasscodePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
