import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { catchError, of, tap } from 'rxjs';
import { environment } from '../../environments/environment';

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
  constructor(private tokenService: TokenService, private http: HttpClient) {}

  getIp(): any {
    this.http.get<any>(`http://ip-api.com/json`).pipe(
      tap((ipInfo) => {
        return ipInfo;
      }),
      catchError((error) => this.handleError(error, [], error.error.message))
    );
  }

  async getVisitorInfo() {
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

  private async getHostname(): Promise<string> {
    return new Promise((resolve) => {
      resolve(window.location.hostname);
    });
  }

  sendVisitData(data: any) {
    return this.http.post(`${environment.baseUrl}viste/`, data);
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
}
