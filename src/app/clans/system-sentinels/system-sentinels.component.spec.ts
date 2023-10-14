import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemSentinelsComponent } from './system-sentinels.component';

describe('SystemSentinelsComponent', () => {
  let component: SystemSentinelsComponent;
  let fixture: ComponentFixture<SystemSentinelsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SystemSentinelsComponent]
    });
    fixture = TestBed.createComponent(SystemSentinelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
