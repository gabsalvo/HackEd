import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NetworkNomadsComponent } from './network-nomads.component';

describe('NetworkNomadsComponent', () => {
  let component: NetworkNomadsComponent;
  let fixture: ComponentFixture<NetworkNomadsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NetworkNomadsComponent]
    });
    fixture = TestBed.createComponent(NetworkNomadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
