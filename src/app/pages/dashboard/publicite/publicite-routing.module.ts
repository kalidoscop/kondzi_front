import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PubliciteListComponent } from './publicite-list/publicite-list.component';
import { PubliciteAddComponent } from './publicite-add/publicite-add.component';
import { PubliciteDetailsComponent } from './publicite-details/publicite-details.component';

const routes: Routes = [
   {
      path: '',
      children: [
        { path: '', component: PubliciteListComponent },
        { path: 'add', component: PubliciteAddComponent },
        { path: 'details/:id', component: PubliciteDetailsComponent },
      ],
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PubliciteRoutingModule { }
