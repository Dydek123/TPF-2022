import {ComponentFixture, TestBed} from '@angular/core/testing';

import {NewTravellComponent} from './new-travell.component';

describe('NewTravellComponent', () => {
  let component: NewTravellComponent;
  let fixture: ComponentFixture<NewTravellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewTravellComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(NewTravellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
