import { TestBed } from '@angular/core/testing';

import { UserPartyGameRoleService } from './user-party-game-role.service';

describe('UserPartyGameRoleService', () => {
  let service: UserPartyGameRoleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserPartyGameRoleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
