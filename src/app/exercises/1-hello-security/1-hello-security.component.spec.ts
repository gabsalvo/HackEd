import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelloSecurityComponent } from './1-hello-security.component';

describe('HelloSecurityComponent', () => {
  let component: HelloSecurityComponent;
  let fixture: ComponentFixture<HelloSecurityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HelloSecurityComponent]
    });
    fixture = TestBed.createComponent(HelloSecurityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
