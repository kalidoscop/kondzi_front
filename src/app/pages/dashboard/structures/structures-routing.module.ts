import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StructureListComponent } from './structure-list/structure-list.component';

const routes: Routes = [
  { path: '', children: [{ path: '', component: StructureListComponent }] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StructuresRoutingModule {}
