import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeneficiaryregComponent } from './beneficiaryreg.component';

describe('BeneficiaryregComponent', () => {
  let component: BeneficiaryregComponent;
  let fixture: ComponentFixture<BeneficiaryregComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BeneficiaryregComponent]
    });
    fixture = TestBed.createComponent(BeneficiaryregComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
