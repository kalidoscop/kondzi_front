import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StructureListComponent } from './structure-list/structure-list.component';
import { StructureAddComponent } from './structure-add/structure-add.component';
import { StructureDetailsComponent } from './structure-details/structure-details.component';
import { AdresseDoctorComponent } from './adresse-doctor/adresse-doctor.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: StructureListComponent },
      { path: 'add', component: StructureAddComponent },
      { path: 'details/:id', component: StructureDetailsComponent },
      { path: 'adresses', component: AdresseDoctorComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StructuresRoutingModule {}
