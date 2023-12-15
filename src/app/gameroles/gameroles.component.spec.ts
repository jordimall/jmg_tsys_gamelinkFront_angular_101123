import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamerolesComponent } from './gameroles.component';

describe('GamerolesComponent', () => {
  let component: GamerolesComponent;
  let fixture: ComponentFixture<GamerolesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GamerolesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GamerolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
