import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ApiService<T> {

  private static API_URL = environment.apiUrl;

  constructor(protected http: HttpClient) {
  }

}
