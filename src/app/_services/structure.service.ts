import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { AlerteService } from './alerte.service';
import { catchError, Observable, of, tap } from 'rxjs';
import { Structure } from '../_model/structure';
import { environment } from '../../environments/environment';
import { Response } from '../_model/response';
import { Doctor } from '../_model/doctor';
import { StructureQuery } from '../_model/structureQuery';
import { Suggestion } from '../_model/suggestion';

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

  deleteStructurHours(id:string): Observable<Response> {
    return this.http
      .delete<Response>(`${environment.baseUrl}structure/hours/${id}`, {
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
  // https://maps.googleapis.com/maps/api/geocode/json?address=Legbassito&key=AIzaSyA3L1IdT9OeeN2GXjJGkTUVVuNFr7AEWx8
  
  search(newStrucutre:any,page?:string): Observable<StructureQuery> {
    if (page) {
      return this.http.post<StructureQuery>(`${environment.baseUrl}structure/search${page}`, newStrucutre,{
        headers: this.tokenService.getOption(),
      }).pipe(tap((structure)=>{
        this.log(structure)
      }),catchError((error)=>this.handleError(error,[])));
    }
    return this.http.post<StructureQuery>(`${environment.baseUrl}structure/search`, newStrucutre,{
      headers: this.tokenService.getOption(),
    }).pipe(tap((structure)=>{
      this.log(structure)
    }),catchError((error)=>this.handleError(error,[])));
  }

  suggestio(query:any): Observable<Suggestion> {
    return this.http.get<Suggestion>(`${environment.baseUrl}suggestions/?query=${query}`,{
      headers: this.tokenService.getOption(),
    }).pipe(tap((suggestion)=>{
      this.log(suggestion)
    }),catchError((error)=>this.handleError(error,[])));
  }

  viewport(lieu:string): Observable<any> {
    return this.http.get<any>(`https://maps.googleapis.com/maps/api/geocode/json?address=${lieu}&key=AIzaSyA3L1IdT9OeeN2GXjJGkTUVVuNFr7AEWx8`).pipe(tap((res)=>{
      this.log(res)
    }),catchError((error)=>this.handleError(error,[])));
  }









  private log(object: Structure | Structure[] | Response|Doctor[] | StructureQuery|Suggestion, message?: string) {
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
