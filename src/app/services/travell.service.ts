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
    return this.http.get<Travel[]>(this.url);
  }

  add(data: Travel): Observable<Travel> {
    return this.http.post<Travel>(this.url, data);
  }
}
