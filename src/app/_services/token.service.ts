import { isPlatformBrowser, } from '@angular/common';
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Inject, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private route: Router,@Inject(PLATFORM_ID) private platformId: Object) {}
  save(token: string) {
    if (isPlatformBrowser(this.platformId)) {
      sessionStorage.setItem('token', token);
      this.route.navigate(['/']);
    } 
    // else {
    //   localStorage.setItem('token', token);
    //   this.route.navigate(['/']);
    // }
    
    // this.route.navigate(["admin"]);
  }
  isLoged(): boolean {
    const token = this.getToken();
    return !!token;
  }
  getToken(): any {
    if (isPlatformBrowser(this.platformId)) {
      return sessionStorage.getItem('token');
    } 
    // else {
    //   return localStorage.getItem('token');
    // }
  }
  getOption(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.getToken()}`,
    });
  }
  clearToken(): void {
    if (isPlatformBrowser(this.platformId)) {
      sessionStorage.removeItem('token');
      this.route.navigate(['/']);
    } 
    // else {
    //   localStorage.removeItem('token');
    //   this.route.navigate(['/']);
    // }
  }
}
