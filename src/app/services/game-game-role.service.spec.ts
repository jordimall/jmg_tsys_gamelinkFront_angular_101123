import { TestBed } from '@angular/core/testing';

import { GameGameRoleService } from './game-game-role.service';

describe('GameGameRoleService', () => {
  let service: GameGameRoleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameGameRoleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
