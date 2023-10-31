import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolregistrarComponent } from './schoolregistrar.component';

describe('SchoolregistrarComponent', () => {
  let component: SchoolregistrarComponent;
  let fixture: ComponentFixture<SchoolregistrarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SchoolregistrarComponent]
    });
    fixture = TestBed.createComponent(SchoolregistrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
