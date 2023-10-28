import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildbeneficiaryComponent } from './childbeneficiary.component';

describe('ChildbeneficiaryComponent', () => {
  let component: ChildbeneficiaryComponent;
  let fixture: ComponentFixture<ChildbeneficiaryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChildbeneficiaryComponent]
    });
    fixture = TestBed.createComponent(ChildbeneficiaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
