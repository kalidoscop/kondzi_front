import { Component, inject } from '@angular/core';
import { ArticleService } from '../../../../_services/article.service';
import { Article } from '../../../../_model/article';
import { IconsModule } from '../../../../_icons/icons.module';
import { NgClass } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-article-list',
  standalone: true,
  imports: [IconsModule,RouterModule,NgClass],
  templateUrl: './article-list.component.html',
  styleUrl: './article-list.component.scss'
})
export class ArticleListComponent {
  articleService = inject(ArticleService)
  articles : Article[]=[]
  deletedId: string | null = null;



  ngOnInit(): void {
    this.loadArticles()
  }
  loadArticles(){
    this.articleService.getArticles().subscribe((res)=>{
      this.articles=res

    })
  }
  openDeleteModal(id: string) {
    this.deletedId=id
  }
  deleteStructure(id: string) {
    this.deletedId=id
    // console.log(this.deletedId);

    this.articleService.deleteArticle(this.deletedId).subscribe(()=>{
      this.loadArticles()
      this.closeDeleteModal()
    })
    
  }

  closeDeleteModal() {
    this.deletedId=null
  }
}
