import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CryptoCrusadersComponent } from './crypto-crusaders.component';

describe('CryptoCrusadersComponent', () => {
  let component: CryptoCrusadersComponent;
  let fixture: ComponentFixture<CryptoCrusadersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CryptoCrusadersComponent]
    });
    fixture = TestBed.createComponent(CryptoCrusadersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
