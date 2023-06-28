import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeneficiaryFormComponent } from './beneficiary-form.component';

describe('BeneficiaryFormComponent', () => {
  let component: BeneficiaryFormComponent;
  let fixture: ComponentFixture<BeneficiaryFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BeneficiaryFormComponent]
    });
    fixture = TestBed.createComponent(BeneficiaryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
