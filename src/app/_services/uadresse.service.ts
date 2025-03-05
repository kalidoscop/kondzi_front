import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { AlerteService } from './alerte.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UtilAdresse } from '../_model/uadresse';
import { environment } from '../../environments/environment';
import { catchError, Observable, of, tap } from 'rxjs';
import { Response } from '../_model/response';


@Injectable({
  providedIn: 'root'
})
export class UadresseService {
 httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  constructor(
    private tokenService: TokenService,
    private alertService: AlerteService,
    private http: HttpClient
  ) {}

  getUtilAdresses():Observable<UtilAdresse[]>{
    return this.http.get<UtilAdresse[]>(`${environment.baseUrl}uadresse/`,{
      headers:this.tokenService.getOption()
    }).pipe(tap((utilAdresses)=>{
      this.log(utilAdresses)
    }),catchError((error) => this.handleError(error, [],error.error.message)))
  }

  getUtilAdresse(id:string):Observable<UtilAdresse>{
    return this.http.get<UtilAdresse>(`${environment.baseUrl}uadresse/${id}`,{
      headers:this.tokenService.getOption()
    }).pipe(tap((utilAdresse)=>{
      this.log(utilAdresse)
    }),catchError((error) => this.handleError(error, [],error.error.message)))

  }

  addUtilAdresse(newUtilAdresse:any):Observable<UtilAdresse>{
    return this.http.post<UtilAdresse>(`${environment.baseUrl}uadresse/`,newUtilAdresse,{
      headers:this.tokenService.getOption()
    }).pipe(tap((UtilAdresse)=>{
      this.log(UtilAdresse,'Médécin est bien ajouter')
    }),catchError((error) => this.handleError(error, [],error.error.message)))
  }

  // updateUtilAdresse(newUtilAdresse:any,id:string):Observable<UtilAdresse>{
  //   return this.http.put<UtilAdresse>(`${environment.baseUrl}UtilAdresse/${id}`,newUtilAdresse,{
  //     headers:this.tokenService.getOption()
  //   }).pipe(tap((UtilAdresse)=>{
  //     this.log(UtilAdresse,'Médécin est bien modifié')
  //   }),catchError((error) => this.handleError(error, [],error.error.message)))
  // }

  deleteUtilAdresse(id:string):Observable<Response>{
    return this.http.delete<Response>(`${environment.baseUrl}uadresse/${id}`,{
      headers:this.tokenService.getOption()
    }).pipe(tap((Response)=>{
      this.log([],Response.message)
    }),catchError((error) => this.handleError(error, [],error.error.message)))
  }


  private log(object: UtilAdresse | UtilAdresse[] | Response , message?: string) {
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
