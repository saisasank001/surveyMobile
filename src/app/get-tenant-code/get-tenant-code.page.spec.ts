import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetTenantCodePage } from './get-tenant-code.page';

describe('GetTenantCodePage', () => {
  let component: GetTenantCodePage;
  let fixture: ComponentFixture<GetTenantCodePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetTenantCodePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetTenantCodePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
