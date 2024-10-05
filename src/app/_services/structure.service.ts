import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { AlerteService } from './alerte.service';
import { catchError, Observable, of, tap } from 'rxjs';
import { Structure } from '../_model/structure';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StructureService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  constructor(
    private tokenService: TokenService,
    private alertService: AlerteService,
    private http: HttpClient
  ) {}

  getStructure(): Observable<Structure[]> {
    return this.http
      .get<Structure[]>(`${environment.baseUrl}structure/`, {
        headers: this.tokenService.getOption(),
      })
      .pipe(
        tap((structures) => {
          this.log(structures);
        }),
        catchError((error) => this.handleError(error, [],error.error.message))
      );
  }
  addStructure(newStrucutre:any): Observable<Structure> {
    return this.http.post<Structure>(`${environment.baseUrl}structure`, newStrucutre,{
      headers: this.tokenService.getOption(),
    }).pipe(tap((structure)=>{
      this.log(structure,'La structure est bien créé')
    }),catchError((error)=>this.handleError(error,[])));
  }

  private log(object: Structure | Structure[], message?: string) {
    if (environment.isDevEnv) {
      if (object instanceof Array) {
        console.table(object);
      } else {
        console.log(object);
      }
    }
    if (message) {
      this.alertService.creatAlert('success', message, 3000);
    }
  }
  private handleError(error: Error, errorValue: any, message?: string) {
    if (environment.isDevEnv) {
      console.error(error);
    }
    if (message) {
      this.alertService.creatAlert('error', message, 5000);
    }
    return of(errorValue);
  }
}
