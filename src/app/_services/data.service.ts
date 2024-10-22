import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  private eventSubject = new Subject<object>();

  emitEvent(data: object) {
    this.eventSubject.next(data);
  }

  public get events$() {
    return this.eventSubject.asObservable();
  }
}
