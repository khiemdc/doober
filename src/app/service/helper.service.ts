import { Injectable } from '@angular/core';
import { ICountry } from '../shared/lookup-interfaces/country';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

constructor(private httpClient: HttpClient) { }

  getCountries(): Observable<ICountry[]> {
  // return this.http.get<ICountry[]>('http://localhost:41516/api');
  // return this.httpClient.get<ICountry[]>('../../src/app/shared/data/countries.json');
  return this.httpClient.get<ICountry[]>('assets/countries.json');
}

}

