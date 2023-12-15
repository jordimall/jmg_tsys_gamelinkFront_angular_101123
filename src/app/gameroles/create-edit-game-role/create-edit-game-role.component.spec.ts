import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditGameRoleComponent } from './create-edit-game-role.component';

describe('CreateEditGameRoleComponent', () => {
  let component: CreateEditGameRoleComponent;
  let fixture: ComponentFixture<CreateEditGameRoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateEditGameRoleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateEditGameRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
