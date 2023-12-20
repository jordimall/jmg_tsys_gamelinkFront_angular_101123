import { TestBed } from '@angular/core/testing';

import { InfoMessageService } from './info-message.service';

describe('MessageService', () => {
  let service: InfoMessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InfoMessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
