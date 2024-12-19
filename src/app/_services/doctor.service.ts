import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { AlerteService } from './alerte.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, of, tap } from 'rxjs';
import { Doctor } from '../_model/doctor';
import { environment } from '../../environments/environment';
import { DoctorQuery } from '../_model/doctorQuery';

@Injectable({
  providedIn: 'root',
})
export class DoctorService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  constructor(
    private tokenService: TokenService,
    private alertService: AlerteService,
    private http: HttpClient
  ) {}

  getDotors():Observable<Doctor[]>{
    return this.http.get<Doctor[]>(`${environment.baseUrl}doctor/`,{
      headers:this.tokenService.getOption()
    }).pipe(tap((docotrs)=>{
      this.log(docotrs)
    }),catchError((error) => this.handleError(error, [],error.error.message)))
  }

  getDotor(id:string):Observable<Doctor>{
    return this.http.get<Doctor>(`${environment.baseUrl}doctor/${id}`,{
      headers:this.tokenService.getOption()
    }).pipe(tap((docotr)=>{
      this.log(docotr)
    }),catchError((error) => this.handleError(error, [],error.error.message)))

  }

  addDoctor(newDoctor:any):Observable<Doctor>{
    return this.http.post<Doctor>(`${environment.baseUrl}doctor/`,newDoctor,{
      headers:this.tokenService.getOption()
    }).pipe(tap((doctor)=>{
      this.log(doctor,'Médécin est bien ajouter')
    }),catchError((error) => this.handleError(error, [],error.error.message)))
  }

  updateDoctor(newDoctor:any,id:string):Observable<Doctor>{
    return this.http.put<Doctor>(`${environment.baseUrl}doctor/${id}`,newDoctor,{
      headers:this.tokenService.getOption()
    }).pipe(tap((doctor)=>{
      this.log(doctor,'Médécin est bien modifié')
    }),catchError((error) => this.handleError(error, [],error.error.message)))
  }

  search(newStrucutre:any,page?:string): Observable<DoctorQuery> {
    if (page) {
      return this.http.post<DoctorQuery>(`${environment.baseUrl}structure/search${page}`, newStrucutre,{
        headers: this.tokenService.getOption(),
      }).pipe(tap((structure)=>{
        this.log(structure)
      }),catchError((error)=>this.handleError(error,[])));
    }
    return this.http.post<DoctorQuery>(`${environment.baseUrl}structure/search`, newStrucutre,{
      headers: this.tokenService.getOption(),
    }).pipe(tap((structure)=>{
      this.log(structure)
    }),catchError((error)=>this.handleError(error,[])));
  }

  private log(object: Doctor | Doctor[] | Response |DoctorQuery, message?: string) {
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
