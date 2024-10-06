import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoctorListComponent } from './doctor-list/doctor-list.component';
import { DoctorAddComponent } from './doctor-add/doctor-add.component';
import { DoctorDetailsComponent } from './doctor-details/doctor-details.component';

const routes: Routes = [
  {
    path:'',
    children:[
      {path:'',component:DoctorListComponent},
      {path:'add',component:DoctorAddComponent},
      {path:'details/:id',component:DoctorDetailsComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DoctorsRoutingModule { }
