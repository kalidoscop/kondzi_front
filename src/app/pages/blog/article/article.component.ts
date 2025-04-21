import { Component, inject, OnInit } from '@angular/core';
import { ScrollService } from '../../../_services/scroll.service';
import { ArticleService } from '../../../_services/article.service';
import { ActivatedRoute } from '@angular/router';
import { FooterComponent } from '../../component/footer/footer.component';
import { environment } from '../../../../environments/environment';
import { NgClass, NgIf,formatDate, registerLocaleData } from '@angular/common';
import { BlogComponent } from '../../component/blog/blog.component';
import { IconsModule } from '../../../_icons/icons.module';
import { Article } from '../../../_model/article';
registerLocaleData(localeFr, 'fr');
import localeFr from '@angular/common/locales/fr';
import { AlerteService } from '../../../_services/alerte.service';
@Component({
  selector: 'app-article',
  standalone: true,
  imports: [FooterComponent, NgIf, BlogComponent, IconsModule,NgClass],
  templateUrl: './article.component.html',
  styleUrl: './article.component.scss',
})
export class ArticleComponent implements OnInit {
  // content: string = '';
  baseUrl: string = `${environment.baseUrl}uploads/`;
  // image: string = '';
  // likeByHim: boolean = false;
  // dislikeByHim: boolean = false;

  // dislikesCount: string = '';
  // likesCount: string = '';

  article : Article [] =[]

  scrollService = inject(ScrollService);
  articleService = inject(ArticleService);
    private alertService = inject(AlerteService);
  
  private activatedRoute = inject(ActivatedRoute);

  articleId: string | null = this.activatedRoute.snapshot.paramMap.get('id');
  // article: Article;
  ngOnInit(): void {
    this.scrollService.setNavbarOpaque(true);
    this.loadArticle()
  }

  loadArticle(){
    if (this.articleId) {
      this.articleService.getArticle(this.articleId).subscribe((res) => {
        this.article=[res]
        // this.content = res.content;
        // this.image = res.image;
        // this.likesCount = res.likesCount;
        // this.dislikeByHim = res.dislikeByHim;
        // this.dislikesCount = res.dislikesCount;
        // this.likeByHim = res.likeByHim;
      });
    }
  }

  likeArticle(){
    if (this.articleId) {
      this.articleService.likeArticle(this.articleId).subscribe(()=>{
        this.loadArticle()
      })
    }
  }

  dislikeArticle(){
    if (this.articleId) {
      this.articleService.dislikeArticle(this.articleId).subscribe(()=>{
        this.loadArticle()
      })
    }
  }

  shareArticle(article: any,event: MouseEvent) {
    event.stopPropagation();
    const url = `${window.location.origin}/article/${article.id}`;

    try {
      navigator
        .share({
          title: article.title,
          text:`${article.title}
          `,
          url: url,
        })
        .then(() => {
          console.log('Partagé avec succès');
        })
        .catch((error) => {
          console.error('Erreur de partage', error);
        });
    } catch (error) {
      // alert("Le partage n'est pas supporté sur ce navigateur.")
      navigator.clipboard.writeText(url).then(() => {
        this.alertService.creatAlert('success', 'Lien copié dans le presse-papiers !', 3000);
      });
    }

    // if (navigator.share) {

    // } else {
    //   // Fallback si la Web Share API n’est pas supportée

    // }
  }


   Date(date: string | null | undefined): string {
      if (date) {
        return formatDate(date, 'shortDate', 'fr-FR');
      }
      return '';
    }
}
