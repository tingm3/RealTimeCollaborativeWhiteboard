import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderWhiteboard } from './header-whiteboard';

describe('HeaderWhiteboard', () => {
  let component: HeaderWhiteboard;
  let fixture: ComponentFixture<HeaderWhiteboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderWhiteboard],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderWhiteboard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
