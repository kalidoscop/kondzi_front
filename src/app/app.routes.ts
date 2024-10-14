import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AcceuilComponent } from './pages/acceuil/acceuil.component';
import { AuthGuard } from './_guard/auth.guard';
import { AnnuaireComponent } from './pages/annuaire/annuaire.component';
import { BaseComponent } from './_layout/client/base/base.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/acceuil', pathMatch: 'full' },
  // { path: 'annuaire', component:  },
  {
    path: 'annuaire',
    component:BaseComponent,
    children: [
      { path: ':word/:zone/:type', component: AnnuaireComponent },
    ],
  },
  {
    path: 'acceuil',
    component:BaseComponent,
    children: [
      { path: '', component: AcceuilComponent },
    ],
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        // canActivate: [AuthGuard],
        loadChildren: () =>
          import('./pages/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
    ],
  },
];
