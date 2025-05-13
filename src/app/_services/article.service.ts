import { Injectable, TransferState,PLATFORM_ID, Inject, makeStateKey } from '@angular/core';
import { TokenService } from './token.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AlerteService } from './alerte.service';
import { Article } from '../_model/article';
import { environment } from '../../environments/environment';
import { catchError, Observable, of, tap } from 'rxjs';
import { Response } from '../_model/response';


const PUBS_KEY = makeStateKey<any>('publicites');
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
    private state: TransferState,
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  getArticles():Observable<Article[]>{
    // if (this.state.hasKey(PUBS_KEY)) {
    //   const data = this.state.get(PUBS_KEY, null);
    //   this.state.remove(PUBS_KEY);
    //   return of(data); // Ne fait pas d’appel HTTP
    // } else {
    //   return this.http.get('https://api.exemple.com/publicites').pipe(
    //     tap(data => {
    //       if (isPlatformServer(this.platformId)) {
    //         this.state.set(PUBS_KEY, data);
    //       }
    //     })
    //   );
    // }
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

  likeArticle(id:string):Observable<Article>{
    return this.http.get<Article>(`${environment.baseUrl}article/like/${id}`,{
      headers:this.tokenService.getOption()
    }).pipe(tap((article)=>{
      this.log(article)
    }),catchError((error) => this.handleError(error, [],error.error.message)))

  }

  dislikeArticle(id:string):Observable<Article>{
    return this.http.get<Article>(`${environment.baseUrl}article/dislike/${id}`,{
      headers:this.tokenService.getOption()
    }).pipe(tap((article)=>{
      this.log(article)
    }),catchError((error) => this.handleError(error, [],error.error.message)))

  }

  addArticle(newArticle:any,file:File):Observable<Article>{
    const formData = new FormData();

    // Ajouter les données de l'article
    formData.append('title', newArticle.title || '');
    formData.append('autor', newArticle.autor || '');
    formData.append('content', newArticle.content || '');

    // Ajouter l'image
    if (file) {
      formData.append('file', file);
    }
    return this.http.post<Article>(`${environment.baseUrl}article/`,formData,{
      headers:this.tokenService.getOption()
    }).pipe(tap((Article)=>{
      this.log(Article,'Médécin est bien ajouter')
    }),catchError((error) => this.handleError(error, [],error.error.message)))
  }

  updateArticle(newArticle:any,id:string,file?:File):Observable<Article>{
    const formData = new FormData();

    // Ajouter les données de l'article
    formData.append('title', newArticle.title || '');
    formData.append('autor', newArticle.autor || '');
    formData.append('content', newArticle.content || '');

    // Ajouter l'image
    if (file) {
      formData.append('image', file);
    }
    return this.http.put<Article>(`${environment.baseUrl}article/${id}`,formData,{
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
