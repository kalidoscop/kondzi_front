import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NosMissionComponent } from './nos-mission/nos-mission.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', redirectTo: 'nos-mission', pathMatch: 'full' },
      { path: 'nos-mission', component: NosMissionComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuRoutingModule { }
