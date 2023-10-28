import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthDevComponent } from './auth-dev.component';

describe('AuthDevComponent', () => {
  let component: AuthDevComponent;
  let fixture: ComponentFixture<AuthDevComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuthDevComponent]
    });
    fixture = TestBed.createComponent(AuthDevComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
