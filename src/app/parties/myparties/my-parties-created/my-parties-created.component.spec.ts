import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPartiesCreatedComponent } from './my-parties-created.component';

describe('MyPartiesCreatedComponent', () => {
  let component: MyPartiesCreatedComponent;
  let fixture: ComponentFixture<MyPartiesCreatedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyPartiesCreatedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyPartiesCreatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
