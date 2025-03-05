import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UadresseListComponent } from './uadresse-list/uadresse-list.component';

const routes: Routes = [ {
    path: '',
    children: [
      { path: '', component: UadresseListComponent },
      
    ],
  },];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UadresseRoutingModule { }
