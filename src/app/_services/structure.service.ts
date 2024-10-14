import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { AlerteService } from './alerte.service';
import { catchError, Observable, of, tap } from 'rxjs';
import { Structure } from '../_model/structure';
import { environment } from '../../environments/environment';
import { Response } from '../_model/response';
import { Doctor } from '../_model/doctor';

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

  getStructures(): Observable<Structure[]> {
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
  getStructure(id:string): Observable<Structure> {
    return this.http
      .get<Structure>(`${environment.baseUrl}structure/${id}`, {
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
      this.log(structure,'La structure est bien créée')
    }),catchError((error)=>this.handleError(error,[])));
  }
  updateStructure(newStrucutre:any,id:string): Observable<Structure> {
    return this.http.put<Structure>(`${environment.baseUrl}structure/${id}`, newStrucutre,{
      headers: this.tokenService.getOption(),
    }).pipe(tap((structure)=>{
      this.log(structure,'La structure est bien modifiée')
    }),catchError((error)=>this.handleError(error,[])));
  }
  deleteStructurAdresse(id:string): Observable<Response> {
    return this.http
      .delete<Response>(`${environment.baseUrl}structure/adresse/${id}`, {
        headers: this.tokenService.getOption(),
      })
      .pipe(
        tap((Response) => {
          this.log(Response);
        }),
        catchError((error) => this.handleError(error, [],error.error.message))
      );
  }
  deleteStructurNetwork(id:string): Observable<Response> {
    return this.http
      .delete<Response>(`${environment.baseUrl}structure/network/${id}`, {
        headers: this.tokenService.getOption(),
      })
      .pipe(
        tap((Response) => {
          this.log(Response);
        }),
        catchError((error) => this.handleError(error, [],error.error.message))
      );
  }
  getAdresseDoctor(id:string): Observable<Doctor[]> {
    return this.http
      .get<Doctor[]>(`${environment.baseUrl}structure/adresse/doctor/${id}`, {
        headers: this.tokenService.getOption(),
      })
      .pipe(
        tap((structures) => {
          this.log(structures);
        }),
        catchError((error) => this.handleError(error, [],error.error.message))
      );
  }
  attachAdresseDoctor(id:string,doctorId:string): Observable<Response> {
    return this.http
      .get<Response>(`${environment.baseUrl}structure/adresse/doctor/${id}/${doctorId}`, {
        headers: this.tokenService.getOption(),
      })
      .pipe(
        tap((structures) => {
          this.log(structures);
        }),
        catchError((error) => this.handleError(error, [],error.error.message))
      );
  }
  detachAdresseDoctor(id:string,doctorId:string): Observable<Response> {
    return this.http
      .delete<Response>(`${environment.baseUrl}structure/adresse/doctor/${id}/${doctorId}`, {
        headers: this.tokenService.getOption(),
      })
      .pipe(
        tap((structures) => {
          this.log(structures);
        }),
        catchError((error) => this.handleError(error, [],error.error.message))
      );
  }
  search(newStrucutre:any): Observable<Structure[]> {
    return this.http.post<Structure[]>(`${environment.baseUrl}structure/search`, newStrucutre,{
      headers: this.tokenService.getOption(),
    }).pipe(tap((structure)=>{
      this.log(structure)
    }),catchError((error)=>this.handleError(error,[])));
  }









  private log(object: Structure | Structure[] | Response|Doctor[], message?: string) {
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
