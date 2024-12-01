import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AcceuilComponent } from './pages/acceuil/acceuil.component';
import { AuthGuard } from './_guard/auth.guard';
import { AnnuaireComponent } from './pages/annuaire/annuaire.component';
import { BaseComponent } from './_layout/client/base/base.component';
import { NosMissionComponent } from './pages/nos-mission/nos-mission.component';
import { QuiSommesNousComponent } from './pages/qui-sommes-nous/qui-sommes-nous.component';
import { NosPartenaireComponent } from './pages/nos-partenaire/nos-partenaire.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/acceuil', pathMatch: 'full' },
  // { path: 'annuaire', component:  },
  {
    path: 'annuaire',
    component:BaseComponent,
    children: [
      { path: ':word/:type/:zone/:slng/:nlng/:slat/:nlat', component: AnnuaireComponent },
      { path: ':word/:type', component: AnnuaireComponent },
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
    path: 'nos-mission',
    component:BaseComponent,
    children: [
      { path: '', component: NosMissionComponent },
    ],
  },

  {
    path: 'qui-sommes-nous',
    component:BaseComponent,
    children: [
      { path: '', component: QuiSommesNousComponent },
    ],
  },

  {
    path: 'nos-partenaires',
    component:BaseComponent,
    children: [
      { path: '', component: NosPartenaireComponent },
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
