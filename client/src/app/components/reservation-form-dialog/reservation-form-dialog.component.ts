import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Vehicle } from '../../../../../common/tables/Vehicle';
import { CommunicationService } from 'src/app/services/communication.service';
import { formatDate } from '@angular/common';
import { Reservation } from '../../../../../common/tables/reservation';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';

export interface Fruit {
  name: string;
}

@Component({
  selector: 'app-reservation-form-dialog',
  templateUrl: './reservation-form-dialog.component.html',
  styleUrls: ['./reservation-form-dialog.component.css']
})
export class ReservationFormDialogComponent {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  vehicles: Vehicle[] = [];
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  requirements: String[] = ['GPS'];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ReservationFormDialogComponent>,
    private http : CommunicationService
  ) {
    this.createFormGroups();
  }

  createFormGroups() {
    this.firstFormGroup = this.fb.group({
      membernum: ['', Validators.required],
      startdate: ['', Validators.required],
      enddate: ['', Validators.required]
    });

    this.secondFormGroup = this.fb.group({
      vehicleplate: ['', Validators.required]
    });
  }

  retrieveVehicles() {
    // Get the start and end dates from the formGroup
    if (this.firstFormGroup.valid){
      const startDate = this.firstFormGroup.get('startdate')?.value;
      const endDate = this.firstFormGroup.get('enddate')?.value;

      // Convert the start and end dates into TIMESTAMP format
      const startDateTimestamp = formatDate(startDate, 'yyyy-MM-dd HH:mm:ss', 'en');
      const endDateTimestamp = formatDate(endDate, 'yyyy-MM-dd HH:mm:ss', 'en');

      // Call the service method to fetch available vehicles during the date range
      this.http.getAvailableVehicles(startDateTimestamp, endDateTimestamp).subscribe((vehicles: Vehicle[]) => {
        this.vehicles = vehicles;
      });
  }
  }
  
  

  onSubmit() {
    if (this.firstFormGroup.valid && this.secondFormGroup.valid) {
      const requirementsString = this.requirements.join(', ');
      const reservation: Reservation = {
        reservationid: this.generateReservationId(),
        vehicleplate: this.secondFormGroup.value.vehicleplate,
        startdate: this.firstFormGroup.value.startdate,
        enddate: this.firstFormGroup.value.enddate,
        requirements: requirementsString,
        membernum: this.firstFormGroup.value.membernum,
      };
  
      // Send the reservation object to the server to save it in the database
      this.http.createReservation(reservation).subscribe(() => {
        this.requirements= ['GPS'];
        this.dialogRef.close();
      });

    }

  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.requirements.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(requirement: string): void {
    const index = this.requirements.indexOf(requirement);

    if (index >= 0) {
      this.requirements.splice(index, 1);
    }
  }

  edit(requirement: string, event: MatChipEditedEvent) {
    const value = event.value.trim();

    // Remove fruit if it no longer has a name
    if (!value) {
      this.remove(requirement);
      return;
    }

    // Edit existing fruit
    const index = this.requirements.indexOf(requirement);
    if (index >= 0) {
      this.requirements[index] = value;
    }
  }
  private generateReservationId(): string {
    return Math.random().toString(36).substr(2, 10).toUpperCase();
  }
}
