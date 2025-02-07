import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { AlerteService } from './alerte.service';
import { TokenService } from './token.service';
import { environment } from '../../environments/environment';
import { Publicite } from '../_model/publicite';
import { Response } from '../_model/response';


@Injectable({
  providedIn: 'root'
})
export class PubliciteService {
 httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  constructor(
    private tokenService: TokenService,
    private alertService: AlerteService,
    private http: HttpClient
  ) {}

  getPublicites():Observable<Publicite[]>{
    return this.http.get<Publicite[]>(`${environment.baseUrl}pabla/`,{
      headers:this.tokenService.getOption()
    }).pipe(tap((Publicites)=>{
      this.log(Publicites)
    }),catchError((error) => this.handleError(error, [],error.error.message)))
  }

  getPublicite(id:string):Observable<Publicite>{
    return this.http.get<Publicite>(`${environment.baseUrl}pabla/${id}`,{
      headers:this.tokenService.getOption()
    }).pipe(tap((Publicite)=>{
      this.log(Publicite)
    }),catchError((error) => this.handleError(error, [],error.error.message)))

  }

  addPublicite(newPublicite:any,file:File):Observable<Publicite>{
    console.log('coucou');

    const formData = new FormData();
// this.log('coucou')
    // Ajouter les données de l'Publicite
    formData.append('name', newPublicite.name || '');
    formData.append('description', newPublicite.description || '');
    // formData.append('content', newPublicite.content || '');

    // Ajouter l'image
    if (file) {
      formData.append('file', file);
    }
    return this.http.post<Publicite>(`${environment.baseUrl}pabla/`,formData,{
      headers:this.tokenService.getOption()
    }).pipe(tap((Publicite)=>{
      this.log(Publicite,'Publicité est bien ajouté')
    }),catchError((error) => this.handleError(error, [],error.error.message)))
  }

  updatePublicite(newPublicite:any,id:string,file?:File):Observable<Publicite>{
    const formData = new FormData();

    // Ajouter les données de l'Publicite
    formData.append('title', newPublicite.title || '');
    formData.append('autor', newPublicite.autor || '');
    formData.append('content', newPublicite.content || '');

    // Ajouter l'image
    if (file) {
      formData.append('image', file);
    }
    return this.http.put<Publicite>(`${environment.baseUrl}pabla/${id}`,formData,{
      headers:this.tokenService.getOption()
    }).pipe(tap((Publicite)=>{
      this.log(Publicite,'Médécin est bien modifié')
    }),catchError((error) => this.handleError(error, [],error.error.message)))
  }

  deletePublicite(id:string):Observable<Response>{
    return this.http.delete<Response>(`${environment.baseUrl}pabla/${id}`,{
      headers:this.tokenService.getOption()
    }).pipe(tap((Response)=>{
      this.log([],Response.message)
    }),catchError((error) => this.handleError(error, [],error.error.message)))
  }

  // search(newStrucutre:any,page?:string): Observable<PubliciteQuery> {
  //   if (page) {
  //     return this.http.post<PubliciteQuery>(`${environment.baseUrl}structure/search${page}`, newStrucutre,{
  //       headers: this.tokenService.getOption(),
  //     }).pipe(tap((structure)=>{
  //       this.log(structure)
  //     }),catchError((error)=>this.handleError(error,[])));
  //   }
  //   return this.http.post<PubliciteQuery>(`${environment.baseUrl}structure/search`, newStrucutre,{
  //     headers: this.tokenService.getOption(),
  //   }).pipe(tap((structure)=>{
  //     this.log(structure)
  //   }),catchError((error)=>this.handleError(error,[])));
  // }

  private log(object: Publicite | Publicite[] | Response , message?: string) {
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
  private handleError(error: Error, errorValue: any, message?: string) {
    if (environment.isDevEnv) {
      console.error(error);
    }
    if (message) {
      this.alertService.creatAlert('error', message, 5000);
    }
    return of(errorValue);
  }
}
