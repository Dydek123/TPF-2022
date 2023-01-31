import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ReservationModel} from "../shared/models/reservation.model";
import {Travel} from "../shared/models/travel.model";

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  url: string = `${environment.apiUrl}/reservation`;

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<ReservationModel[]> {
    return this.http.get<ReservationModel[]>(this.url + '?_expand=user'); //TODO remove expand
  }

  getByTravelId(id: number): Observable<ReservationModel[]> {
    const params = {
      travelId: id
    }
    return this.http.get<ReservationModel[]>(this.url + '?_expand=user', {params}); //TODO remove expand
  }

  add(data: Travel): Observable<ReservationModel> {
    const reservation = new ReservationModel();
    reservation.userId = data.userId;
    reservation.travelId = data.id;
    reservation.isAccepted = false;
    reservation.createdOn = new Date();
    return this.http.post<ReservationModel>(this.url, reservation);
  }

  acceptReservation(reservation: ReservationModel, isAccepted: boolean) {
    reservation.isAccepted = isAccepted;
    return this.http.put<Travel>(this.url + '/' + reservation.id, reservation);
  }

  deleteReservation(reservation: ReservationModel) {
    return this.http.delete(`${this.url}/${reservation.id}`);
  }
}
