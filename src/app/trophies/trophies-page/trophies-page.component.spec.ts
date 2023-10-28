import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrophiesPageComponent } from './trophies-page.component';

describe('TrophiesPageComponent', () => {
  let component: TrophiesPageComponent;
  let fixture: ComponentFixture<TrophiesPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TrophiesPageComponent]
    });
    fixture = TestBed.createComponent(TrophiesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
