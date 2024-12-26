import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaingPickerPageComponent } from './raing-picker-page.component';

describe('RaingPickerPageComponent', () => {
  let component: RaingPickerPageComponent;
  let fixture: ComponentFixture<RaingPickerPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RaingPickerPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RaingPickerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
