import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {

  constructor() { }
  private navbarOpaque = new BehaviorSubject<boolean>(false);
  navbarOpaque$ = this.navbarOpaque.asObservable();

  setNavbarOpaque(isOpaque: boolean) {
    this.navbarOpaque.next(isOpaque);
  }
}
