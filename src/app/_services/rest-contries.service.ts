import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestContriesService {

  private apiUrl = 'https://restcountries.com/v3.1/region/africa';

  constructor( private http: HttpClient) { }

  getAfricanCountries(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
