import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationFormDialogComponent } from './reservation-form-dialog.component';

describe('ReservationFormDialogComponent', () => {
  let component: ReservationFormDialogComponent;
  let fixture: ComponentFixture<ReservationFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReservationFormDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservationFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
