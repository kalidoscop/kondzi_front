import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AcceuilComponent } from './pages/acceuil/acceuil.component';
import { AuthGuard } from './_guard/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
      { path: 'acceuil', component: AcceuilComponent },
      {
        path: 'dashboard',
        // canActivate: [AuthGuard],
        loadChildren: () =>
          import('./pages/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
    ],
  },
];
