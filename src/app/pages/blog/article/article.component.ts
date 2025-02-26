import { Component, inject, OnInit } from '@angular/core';
import { ScrollService } from '../../../_services/scroll.service';
import { ArticleService } from '../../../_services/article.service';
import { ActivatedRoute } from '@angular/router';
import { FooterComponent } from '../../component/footer/footer.component';
import { environment } from '../../../../environments/environment';
import { NgIf } from '@angular/common';
import { BlogComponent } from "../../component/blog/blog.component";

@Component({
  selector: 'app-article',
  standalone: true,
  imports: [FooterComponent, NgIf, BlogComponent],
  templateUrl: './article.component.html',
  styleUrl: './article.component.scss'
})
export class ArticleComponent implements OnInit {
  content:string = ''
  baseUrl:string = `${environment.baseUrl}uploads/`
  image:string = ''

  scrollService = inject(ScrollService)
  articleService = inject(ArticleService);
  private activatedRoute = inject(ActivatedRoute);

  articleId: string | null = this.activatedRoute.snapshot.paramMap.get('id');

  ngOnInit(): void {
    this.scrollService.setNavbarOpaque(true);
    if (this.articleId) {
      this.articleService.getArticle(this.articleId).subscribe((res)=>{
        this.content=res.content
        this.image=res.image
      })
    }
  }
}
