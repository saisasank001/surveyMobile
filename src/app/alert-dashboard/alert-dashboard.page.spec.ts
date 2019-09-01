import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertDashboardPage } from './alert-dashboard.page';

describe('AlertDashboardPage', () => {
  let component: AlertDashboardPage;
  let fixture: ComponentFixture<AlertDashboardPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertDashboardPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertDashboardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
