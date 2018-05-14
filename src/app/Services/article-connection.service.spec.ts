import { TestBed, inject } from '@angular/core/testing';

import { ArticleConnectionServiceService } from './article-connection-service.service';

describe('ArticleConnectionServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ArticleConnectionServiceService]
    });
  });

  it('should be created', inject([ArticleConnectionServiceService], (service: ArticleConnectionServiceService) => {
    expect(service).toBeTruthy();
  }));
});
