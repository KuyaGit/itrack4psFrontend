import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagecropperdialogComponent } from './imagecropperdialog.component';

describe('ImagecropperdialogComponent', () => {
  let component: ImagecropperdialogComponent;
  let fixture: ComponentFixture<ImagecropperdialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImagecropperdialogComponent]
    });
    fixture = TestBed.createComponent(ImagecropperdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
