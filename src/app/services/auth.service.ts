import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlerteService } from './alerte.service';
import { TokenService } from './token.service';
import { catchError, Observable, of, tap } from 'rxjs';
// import { Login } from '../model/login';
// import { User } from '../model/user';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  constructor(
    private http: HttpClient,
    private alertService: AlerteService,
    private tokenService: TokenService
  ) {}

  login(user: any): Observable<any> {
    return this.http
      .post<any>(`${environment.baseUrl}auth/login/`, user, this.httpOptions)
      .pipe(
        tap((response) => this.log(response, `Bonjour`, true)),
        catchError((error) =>
          this.handleError(
            error,
            [],
            "Impossible de se connecter avec les informations d'identification fournies."
          )
        )
      );
  }

  logout(): Observable<any> {
    return this.http
      .get<any>(`${environment.baseUrl}auth/logout/`, {
        headers: this.tokenService.getOption(),
      })
      .pipe(
        tap((response) => this.log(response, `Deconnexion`, true)),
        catchError((error) =>
          this.handleError(
            error,
            [],
            "Impossible de se connecter avec les informations d'identification fournies."
          )
        )
      );
  }

  private log(
    object: any,
    // object: User | User[] | any,
    message?: string,
    isLogin?: boolean
  ) {
    // console.table(object);
    if (message) {
      this.alertService.creatAlert('success', message, 3000);
    }
    if (isLogin) {
      this.tokenService.save(object.detail.access.token);
    }
  }
  private handleError(error: Error, errorValue: any, message?: string) {
    console.error(error);
    if (message) {
      this.alertService.creatAlert('error', message, 5000);
    }
    return of(errorValue);
  }
}
