import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPartiesJoinedComponent } from './my-parties-joined.component';

describe('MyPartiesJoinedComponent', () => {
  let component: MyPartiesJoinedComponent;
  let fixture: ComponentFixture<MyPartiesJoinedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyPartiesJoinedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyPartiesJoinedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
