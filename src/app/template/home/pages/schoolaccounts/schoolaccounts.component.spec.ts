import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolaccountsComponent } from './schoolaccounts.component';

describe('SchoolaccountsComponent', () => {
  let component: SchoolaccountsComponent;
  let fixture: ComponentFixture<SchoolaccountsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SchoolaccountsComponent]
    });
    fixture = TestBed.createComponent(SchoolaccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
