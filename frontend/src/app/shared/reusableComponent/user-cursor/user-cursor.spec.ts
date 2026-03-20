import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCursor } from './user-cursor';

describe('UserCursor', () => {
  let component: UserCursor;
  let fixture: ComponentFixture<UserCursor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserCursor],
    }).compileComponents();

    fixture = TestBed.createComponent(UserCursor);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
