import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { catchError, Observable, of, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { VsiteMouth } from '../_model/visite';
import { AlerteService } from './alerte.service';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';

interface ipInt {
  country: string;
}
@Injectable({
  providedIn: 'root',
})
export class VisiteService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private alertService: AlerteService,
    private tokenService: TokenService,
    private http: HttpClient
  ) {}

  getIp(): any {
    this.http.get<any>(`http://ip-api.com/json`).pipe(
      tap((ipInfo) => {
        return ipInfo;
      }),
      catchError((error) => this.handleError(error, [], error.error.message))
    );
  }

  async getVisitorInfo() {
    if (isPlatformBrowser(this.platformId)) {
      const browser = `${navigator.appName} ${navigator.appVersion}`;
      const hostname = await this.getHostname();
      const ipInfo = await this.http
        .get<ipInt>('http://ip-api.com/json')
        .toPromise();
      const visitTime = new Date().toISOString();
      if (ipInfo) {
        return {
          browser,
          hostname,
          country: ipInfo['country'],
          visitTime,
        };
      }
      return {
        browser,
        hostname,
        country: 'no country',
        visitTime,
      };
    }
    return {};
  }
  isFirstVisit(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      const visitRecorded = sessionStorage.getItem('visitRecorded');
      return !visitRecorded; // Retourne true si aucune visite enregistrée
    }
    return false;
  }

  markVisitAsRecorded(): void {
    if (isPlatformBrowser(this.platformId)) {
      sessionStorage.setItem('visitRecorded', 'true');
    }
  }

  private async getHostname(): Promise<string> {
    return new Promise((resolve) => {
      if (isPlatformBrowser(this.platformId)) {
        resolve(window.location.hostname);
      }
    });
  }

  sendVisitData(data: any) {
    return this.http.post(`${environment.baseUrl}viste/`, data);
  }

  getVisiteByMouth(): Observable<VsiteMouth[]> {
    return this.http
      .get<VsiteMouth[]>(`${environment.baseUrl}viste/`, {
        headers: this.tokenService.getOption(),
      })
      .pipe(
        tap((structures) => {
          this.log(structures);
        }),
        catchError((error) => this.handleError(error, [], error.error.message))
      );
  }

  private handleError(error: Error, errorValue: any, message?: string) {
    if (environment.isDevEnv) {
      console.error(error);
    }
    if (message) {
      // this.alertService.creatAlert('error', message, 5000);
      console.error(message);
    }
    return of(errorValue);
  }

  private log(object: VsiteMouth[], message?: string) {
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
}
