import { TestBed, inject } from '@angular/core/testing';

import { UserConnectionService } from './user-connection.service';

describe('UserConnectionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserConnectionService]
    });
  });

  it('should be created', inject([UserConnectionService], (service: UserConnectionService) => {
    expect(service).toBeTruthy();
  }));
});
