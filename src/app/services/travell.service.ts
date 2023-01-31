import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {Travel} from "../shared/models/travel.model";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class TravellService {
  url: string = `${environment.apiUrl}/travel`;

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<Travel[]> {
    return this.http.get<Travel[]>(this.url + '?_expand=user'); //TODO remove expand
  }

  getByUserId(id: string): Observable<Travel[]> {
    const params = {
      userId: id
    }
    return this.http.get<Travel[]>(this.url + '?_expand=user', {params}); //TODO remove expand
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
