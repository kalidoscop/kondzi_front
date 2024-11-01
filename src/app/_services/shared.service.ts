import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

  private callComponentSource = new Subject<void>();
  // private callParentId =  new Subject<{ eventName: string, data: string }>()

  callComponent$ = this.callComponentSource.asObservable();
  // callParentId$ = this.callParentId.asObservable();


  callComponent() {
    this.callComponentSource.next();
  }
  // callParentWithId(eventName: string, data: string) {
  //   this.callParentId.next({ eventName, data });
  // }
}
