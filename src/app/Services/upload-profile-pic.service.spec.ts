import { TestBed, inject } from '@angular/core/testing';

import { UploadProfilePicService } from './upload-profile-pic.service';

describe('UploadProfilePicService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UploadProfilePicService]
    });
  });

  it('should be created', inject([UploadProfilePicService], (service: UploadProfilePicService) => {
    expect(service).toBeTruthy();
  }));
});
