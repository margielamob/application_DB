import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject, catchError, of } from "rxjs";
import { Member } from "../../../../common/tables/member";
import { Reservation } from "../../../../common/tables/reservation";
import { Vehicle } from "../../../../common/tables/Vehicle";

@Injectable()
export class CommunicationService {
  private readonly BASE_URL: string = "http://localhost:3000/database";
  public constructor(private readonly http: HttpClient) {}

  private _listeners: any = new Subject<any>();

  listen(): Observable<any> {
    return this._listeners.asObservable();
  }

  filter(filterBy: string): void {
    this._listeners.next(filterBy);
  }
  
  public searchMembersByName(name: string): Observable<Member[]> {
    return this.http.get<Member[]>(`${this.BASE_URL}/members/search/${name}`).pipe(catchError(this.handleError<Member[]>("searchMembersByName")));
  }
  public getReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${this.BASE_URL}/tables/Reservation`).pipe(catchError(this.handleError<Reservation[]>("getReservations")));
  }
  public getAvailableVehicles(startDateTimestamp: string, endDateTimestamp: string): Observable<Vehicle[]> {
    const params = new HttpParams()
      .set('start_date', startDateTimestamp)
      .set('end_date', endDateTimestamp);
  
    return this.http.get<Vehicle[]>(`${this.BASE_URL}/vehicles/plate-brand-model`, { params }).pipe(
      catchError(this.handleError<Vehicle[]>("getAvailableVehicles"))
    );
  }

  public createReservation(reservation: Reservation): Observable<any> {
    return this.http.post<any>(`${this.BASE_URL}/reservations`, reservation).pipe(catchError(this.handleError("createReservation")));
  }
  
 
  private handleError<T>(
    request: string,
    result?: T
  ): (error: Error) => Observable<T> {
    return (error: Error): Observable<T> => {
      return of(result as T);
    };
  }
}
