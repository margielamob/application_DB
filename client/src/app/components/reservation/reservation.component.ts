import { Component, OnInit } from '@angular/core';
import { CommunicationService } from 'src/app/services/communication.service';
import { Reservation } from '../../../../../common/tables/reservation';
import { MatDialog } from '@angular/material/dialog';
import { ReservationFormDialogComponent } from '../reservation-form-dialog/reservation-form-dialog.component';
import {Vehicle} from '../../../../../common/tables/Vehicle';
@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {
  reservations: Reservation[];
  visibleReservations: Reservation[] = [];
  vehicles: Vehicle[];
  currentPage: number = 0;
  itemsPerPage: number = 4;

  constructor(private http: CommunicationService, private dialog: MatDialog) { }

  ngOnInit() {
    this.http.getReservations().subscribe((data: Reservation[]) => {
      this.reservations = data;
      this.updateVisibleReservations();
    });
  }

  openReservationDialog() {
    this.dialog.open(ReservationFormDialogComponent);
  }

  updateVisibleReservations() {
    this.visibleReservations = this.reservations.slice(this.currentPage * this.itemsPerPage, (this.currentPage * this.itemsPerPage) + this.itemsPerPage);
  }

  nextPage() {
    if ((this.currentPage + 1) * this.itemsPerPage < this.reservations.length) {
      this.currentPage++;
      this.updateVisibleReservations();
    }
  }

  previousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.updateVisibleReservations();
    }
  }
}
