import { TestBed } from '@angular/core/testing';

import { GameRoleService } from './game-role.service';

describe('GameRoleService', () => {
  let service: GameRoleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameRoleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
