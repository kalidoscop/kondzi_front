import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AcceuilComponent } from './pages/acceuil/acceuil.component';
import { AuthGuard } from './_guard/auth.guard';
import { AnnuaireComponent } from './pages/annuaire/annuaire.component';
import { BaseComponent } from './_layout/client/base/base.component';
import { NosMissionComponent } from './pages/blog/nos-mission/nos-mission.component';
import { QuiSommesNousComponent } from './pages/blog/qui-sommes-nous/qui-sommes-nous.component';
import { NosPartenaireComponent } from './pages/blog/nos-partenaire/nos-partenaire.component';
import { ActualitesSanteComponent } from './pages/blog/actualites-sante/actualites-sante.component';
import { RepertoiresAdressesGeolocaliseesComponent } from './pages/blog/repertoires-adresses-geolocalisees/repertoires-adresses-geolocalisees.component';
import { BienEtreInfosUtilesComponent } from './pages/blog/bien-etre-infos-utiles/bien-etre-infos-utiles.component';
import { MediaSanteComponent } from './pages/blog/media-sante/media-sante.component';
import { AccessibiliteConformitePartielleComponent } from './pages/blog/accessibilite-conformite-partielle/accessibilite-conformite-partielle.component';
import { ConditionsGeneralesUtilisationComponent } from './pages/blog/conditions-generales-utilisation/conditions-generales-utilisation.component';
import { MentionsLegalesComponent } from './pages/blog/mentions-legales/mentions-legales.component';
import { PolitiqueDeConfidentialiteComponent } from './pages/blog/politique-de-confidentialite/politique-de-confidentialite.component';
import { CasUrgenceComponent } from './pages/blog/cas-urgence/cas-urgence.component';
import { ArticleComponent } from './pages/blog/article/article.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  // { path: '', redirectTo: '/', pathMatch: 'full' },
  // { path: 'annuaire', component:  },
  {
    path: 'annuaire',
    component:BaseComponent,
    children: [
      { path: ':word/:zone/:slng/:nlng/:slat/:nlat', component: AnnuaireComponent },
      { path: ':word', component: AnnuaireComponent },
    ],
  },
  {
    path: '',
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
    path: 'actualites-sante',
    component:BaseComponent,
    children: [
      { path: '', component: ActualitesSanteComponent },
    ],
  },
  {
    path: 'repertoires-adresses-geolocalisees',
    component:BaseComponent,
    children: [
      { path: '', component: RepertoiresAdressesGeolocaliseesComponent },
    ],
  },
  {
    path: 'bien-etre-infos-utiles',
    component:BaseComponent,
    children: [
      { path: '', component: BienEtreInfosUtilesComponent },
    ],
  },
  {
    path: 'media-sante',
    component:BaseComponent,
    children: [
      { path: '', component: MediaSanteComponent },
    ],
  },
  {
    path: 'accessibilite-conformite-partielle',
    component:BaseComponent,
    children: [
      { path: '', component: AccessibiliteConformitePartielleComponent },
    ],
  },
  {
    path: 'conditions-generales-utilisation',
    component:BaseComponent,
    children: [
      { path: '', component: ConditionsGeneralesUtilisationComponent },
    ],
  },
  {
    path: 'mentions-legales',
    component:BaseComponent,
    children: [
      { path: '', component: MentionsLegalesComponent },
    ],
  },
  {
    path: 'politique-de-confidentialite',
    component:BaseComponent,
    children: [
      { path: '', component: PolitiqueDeConfidentialiteComponent },
    ],
  },
  {
    path: 'urgence',
    component:BaseComponent,
    children: [
      { path: '', component: CasUrgenceComponent },
    ],
  },
  {
    path: 'article/:id',
    component:BaseComponent,
    children: [
      { path: '', component: ArticleComponent },
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
