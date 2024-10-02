import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private route: Router) {}
  save(token: string) {
    localStorage.setItem('token', token);
    this.route.navigate(['/']);
    // this.route.navigate(["admin"]);
  }
  isLoged(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }
  getOption(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
  }
  clearToken(): void {
    localStorage.removeItem('token');
    this.route.navigate(['/']);
  }
}
