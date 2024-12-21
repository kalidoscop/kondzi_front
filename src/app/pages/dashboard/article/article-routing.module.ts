import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleListComponent } from './article-list/article-list.component';
import { ArticleAddComponent } from './article-add/article-add.component';
import { ArticleDetailsComponent } from './article-details/article-details.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: ArticleListComponent },
      { path: 'add', component: ArticleAddComponent },
      { path: 'details/:id', component: ArticleDetailsComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticleRoutingModule { }
