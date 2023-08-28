import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseholdbeneficiaryComponent } from './householdbeneficiary.component';

describe('HouseholdbeneficiaryComponent', () => {
  let component: HouseholdbeneficiaryComponent;
  let fixture: ComponentFixture<HouseholdbeneficiaryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HouseholdbeneficiaryComponent]
    });
    fixture = TestBed.createComponent(HouseholdbeneficiaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
