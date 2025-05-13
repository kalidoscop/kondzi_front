import { Injectable, Inject, PLATFORM_ID, TransferState, StateKey, makeStateKey } from '@angular/core';
import { isPlatformServer } from '@angular/common';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TransferStateServiceService {
  constructor(
    private state: TransferState,
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  fetchWithTransfer<T>(url: string, keyName: string): Observable<T> {
    const KEY: StateKey<T> = makeStateKey<T>(keyName);

    if (this.state.hasKey(KEY)) {
      const data = this.state.get<T>(KEY, null as any);
      this.state.remove(KEY); // Optionnel, pour ne pas garder l'état trop longtemps
      return of(data);
    }

    return this.http.get<T>(url).pipe(
      tap(data => {
        if (isPlatformServer(this.platformId)) {
          this.state.set<T>(KEY, data);
        }
      })
    );
  }
}
