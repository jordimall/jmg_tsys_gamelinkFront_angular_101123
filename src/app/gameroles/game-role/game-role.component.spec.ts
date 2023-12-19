import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameRoleComponent } from './game-role.component';

describe('GameRoleComponent', () => {
  let component: GameRoleComponent;
  let fixture: ComponentFixture<GameRoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameRoleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GameRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
