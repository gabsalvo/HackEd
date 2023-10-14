import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BinaryBattlersComponent } from './binary-battlers.component';

describe('BinaryBattlersComponent', () => {
  let component: BinaryBattlersComponent;
  let fixture: ComponentFixture<BinaryBattlersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BinaryBattlersComponent]
    });
    fixture = TestBed.createComponent(BinaryBattlersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
