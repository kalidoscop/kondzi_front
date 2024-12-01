import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { AlerteService } from './alerte.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { catchError, Observable, of, tap } from 'rxjs';
import { Page } from '../_model/Page';


@Injectable({
  providedIn: 'root'
})
export class PageService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  constructor(
    private tokenService: TokenService,
    private alertService: AlerteService,
    private http: HttpClient
  ) {}

  changPage(data:any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}page`, data,{
      headers: this.tokenService.getOption(),
    }).pipe(tap((re)=>{
      this.log(re,'La page est bien modifier')
    }),catchError((error)=>this.handleError(error,[])));
  }
  getPage(pageName:string):Observable<Page>{
    return this.http.get<Page>(`${environment.baseUrl}page/${pageName}`,{
      headers: this.tokenService.getOption(),
    }).pipe(tap((re)=>{
      this.log(re)
    }),catchError((error)=>this.handleError(error,[])));
  }



  private log(object: any, message?: string) {
    // if (environment.isDevEnv) {
      if (object instanceof Array) {
        console.table(object);
      } else {
        console.log(object);
      }
    // }
    if (message) {
      this.alertService.creatAlert('success', message, 3000);
    }
  }
  private handleError(error: Error, errorValue: any, message?: string) {
    // if (environment.isDevEnv) {
      console.error(error);
    // }
    if (message) {
      this.alertService.creatAlert('error', message, 5000);
    }
    return of(errorValue);
  }
}
