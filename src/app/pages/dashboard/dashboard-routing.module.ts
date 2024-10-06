import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StructureListComponent } from './structures/structure-list/structure-list.component';
import { BaseComponent } from '../../_layout/dashbord/base/base.component';

const routes: Routes = [
  {
    path: '',
    component:BaseComponent,
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
        path:'doctors',
        loadChildren:()=> import('./doctors/doctors.module').then((m)=>m.DoctorsModule)
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
