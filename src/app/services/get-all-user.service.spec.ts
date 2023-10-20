import { TestBed } from '@angular/core/testing';

import { GetAllUserService } from './get-all-user.service';

describe('GetAllUserService', () => {
  let service: GetAllUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetAllUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
