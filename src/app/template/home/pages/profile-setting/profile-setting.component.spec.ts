import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileSettingComponent } from './profile-setting.component'; // Correct the import path

describe('ProfileSettingComponent', () => {
  let component: ProfileSettingComponent;
  let fixture: ComponentFixture<ProfileSettingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileSettingComponent],
    });
    fixture = TestBed.createComponent(ProfileSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
