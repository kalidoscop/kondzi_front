import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StructureListComponent } from './structures/structure-list/structure-list.component';
import { BaseComponent } from '../../_layout/dashbord/base/base.component';

const routes: Routes = [
  {
    path: '',
    component: BaseComponent,
    children: [
      { path: '', redirectTo: 'stuctures', pathMatch: 'full' },
      // {path:'stuctures',component: StructureListComponent},
      {
        path: 'stuctures',
        loadChildren: () =>
          import('./structures/structures.module').then(
            (m) => m.StructuresModule
          ),
      },
      {
        path: 'doctors',
        loadChildren: () =>
          import('./doctors/doctors.module').then((m) => m.DoctorsModule),
      },
      {
        path: 'menu',
        loadChildren: () =>
          import('./menu/menu.module').then((m) => m.MenuModule),
      },
      {
        path: 'article',
        loadChildren: () =>
          import('./article/article.module').then((m) => m.ArticleModule),
      },
      {
        path: 'pub',
        loadChildren: () =>
          import('./publicite/publicite.module').then((m) => m.PubliciteModule),
      },
      {
        path: 'visite',
        loadChildren: () =>
          import('./stat/stat.module').then((m) => m.StatModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
