import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AlerteService } from './alerte.service';
import { Article } from '../_model/article';
import { environment } from '../../environments/environment';
import { catchError, Observable, of, tap } from 'rxjs';
import { Response } from '../_model/response';



@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  constructor(
    private tokenService: TokenService,
    private alertService: AlerteService,
    private http: HttpClient
  ) {}

  getArticles():Observable<Article[]>{
    return this.http.get<Article[]>(`${environment.baseUrl}article/`,{
      headers:this.tokenService.getOption()
    }).pipe(tap((articles)=>{
      this.log(articles)
    }),catchError((error) => this.handleError(error, [],error.error.message)))
  }

  getArticle(id:string):Observable<Article>{
    return this.http.get<Article>(`${environment.baseUrl}article/${id}`,{
      headers:this.tokenService.getOption()
    }).pipe(tap((article)=>{
      this.log(article)
    }),catchError((error) => this.handleError(error, [],error.error.message)))

  }

  addArticle(newArticle:any):Observable<Article>{
    return this.http.post<Article>(`${environment.baseUrl}article/`,newArticle,{
      headers:this.tokenService.getOption()
    }).pipe(tap((Article)=>{
      this.log(Article,'Médécin est bien ajouter')
    }),catchError((error) => this.handleError(error, [],error.error.message)))
  }

  updateArticle(newArticle:any,id:string):Observable<Article>{
    return this.http.put<Article>(`${environment.baseUrl}article/${id}`,newArticle,{
      headers:this.tokenService.getOption()
    }).pipe(tap((Article)=>{
      this.log(Article,'Médécin est bien modifié')
    }),catchError((error) => this.handleError(error, [],error.error.message)))
  }

  deleteArticle(id:string):Observable<Response>{
    return this.http.delete<Response>(`${environment.baseUrl}article/${id}`,{
      headers:this.tokenService.getOption()
    }).pipe(tap((Response)=>{
      this.log([],Response.message)
    }),catchError((error) => this.handleError(error, [],error.error.message)))
  }

  // search(newStrucutre:any,page?:string): Observable<ArticleQuery> {
  //   if (page) {
  //     return this.http.post<ArticleQuery>(`${environment.baseUrl}structure/search${page}`, newStrucutre,{
  //       headers: this.tokenService.getOption(),
  //     }).pipe(tap((structure)=>{
  //       this.log(structure)
  //     }),catchError((error)=>this.handleError(error,[])));
  //   }
  //   return this.http.post<ArticleQuery>(`${environment.baseUrl}structure/search`, newStrucutre,{
  //     headers: this.tokenService.getOption(),
  //   }).pipe(tap((structure)=>{
  //     this.log(structure)
  //   }),catchError((error)=>this.handleError(error,[])));
  // }

  private log(object: Article | Article[] | Response , message?: string) {
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
