import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {Travel} from "../shared/models/travel.model";
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class TravellService {
  url: string = `${environment.apiUrl}/travels`;

  constructor(private http: HttpClient) {
  }

  getAll(params?: HttpParams): Observable<Travel[]> {
    return this.http.get<Travel[]>(this.url + '?_expand=user&_sort=id&_order=desc', {params});
  }

  add(data: Travel): Observable<Travel> {
    data.createdOn = new Date();
    return this.http.post<Travel>(this.url, data);
  }

  deleteById(id: number | string): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }

  acceptReservation(travel: Travel, isAccepted: boolean) {
    this.setFreeSpace(travel, isAccepted);
    return this.http.put<Travel>(this.url + '/' + travel.id, travel);
  }

  private setFreeSpace(travel: Travel, isAccepted: boolean) {
    if (isAccepted) {
      travel.freeSpace--;
    } else {
      travel.freeSpace++;
    }
  }
}
