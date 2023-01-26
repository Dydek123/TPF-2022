import {ComponentFixture, TestBed} from '@angular/core/testing';

import {UserMarksComponent} from './user-marks.component';

describe('UserMarksComponent', () => {
  let component: UserMarksComponent;
  let fixture: ComponentFixture<UserMarksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserMarksComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(UserMarksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
