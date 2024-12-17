import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { IconsModule } from '../../../_icons/icons.module';
import { StructureService } from '../../../_services/structure.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgClass, NgOptimizedImage } from '@angular/common';
import { DataService } from '../../../_services/data.service';
import { ScrollService } from '../../../_services/scroll.service';
import { Subscription } from 'rxjs';
import { SharedService } from '../../../_services/shared.service';
import { algoliasearch } from 'algoliasearch';
import { autocomplete } from '@algolia/autocomplete-js';
import { createQuerySuggestionsPlugin } from '@algolia/autocomplete-plugin-query-suggestions';

import '@algolia/autocomplete-theme-classic';
import { ModalComponent } from '../../../pages/component/modal/modal.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    IconsModule,
    ReactiveFormsModule,
    ModalComponent,
    RouterModule,
    NgClass,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit, OnDestroy {
  // private client = algoliasearch(
  //   "34AAOQ05H2",
  //   "9702026042bc36c1da382e63818502a5"
  // );
  ngOnDestroy(): void {
    this.scrollSubscription?.unsubscribe();
  }
  place: google.maps.places.PlaceResult | null = null;

  dataservice = inject(DataService);
  scrollService = inject(ScrollService);
  private activatedRoute = inject(ActivatedRoute);

  private scrollSubscription: Subscription | undefined;
  navbarOpaque = false;

  word: string | null = this.activatedRoute.snapshot.paramMap.get('word');
  // type: string | null = this.activatedRoute.snapshot.paramMap.get('type');
  zone: string | null = this.activatedRoute.snapshot.paramMap.get('zone');

  async ngOnInit() {
    console.log('cooooo');

    console.log(this.activatedRoute.url);
    if (this.word && this.zone) {
      this.search = new FormGroup({
        word: new FormControl(this.word, Validators.required),
        zone: new FormControl(this.zone),
      });
      // type: new FormControl(this.type),
    }

    // const searchClient = algoliasearch(
    //   '34AAOQ05H2',
    //   '9702026042bc36c1da382e63818502a5'
    // );
    this.scrollSubscription = this.scrollService.navbarOpaque$.subscribe(
      (isOpaque) => (this.navbarOpaque = isOpaque)
    );
    const center = { lat: 50.064192, lng: -130.605469 };
    const defaultBounds = {
      north: center.lat + 0.1,
      south: center.lat - 0.1,
      east: center.lng + 0.1,
      west: center.lng - 0.1,
    };
    const input = document.getElementById('search') as HTMLInputElement;
    // console.log(input);

    const options = {
      bounds: defaultBounds,
      componentRestrictions: { country: 'tg' },
      fields: ['address_components', 'geometry', 'icon', 'name'],
      strictBounds: false,
    };
    const autocompletes = await new google.maps.places.Autocomplete(
      input,
      options
    );
    autocompletes.addListener('place_changed', () => {
      console.log('coucou');
      // console.log(autocomplete.)
      const place = autocompletes.getPlace();
      this.place = place;
      console.log(place);
    });
    // const querySuggestionsPlugin = createQuerySuggestionsPlugin({
    //   searchClient,
    //   indexName: 'kondzi_dev',
    //   getSearchParams() {
    //     return {
    //       hitsPerPage: 10,
    //     };
    //   },
    // });
    // autocomplete({
    //   container: '#autocomp',
    //   placeholder: 'Search',
    //   openOnFocus: true,
    //   insights: true,
    //   plugins: [querySuggestionsPlugin],
    // });
  }
  structureService = inject(StructureService);
  private router = inject(Router);
  private sharedService = inject(SharedService);

  menu: boolean = false;
  servieMenu: boolean = false;
  menuMobile: boolean = false;

  search = new FormGroup({
    word: new FormControl('',Validators.required),
    zone: new FormControl(''),
  });
  // type: new FormControl(''),

  async onSubmit() {
    if (this.place) {
      const newLink = `/annuaire/${this.search.value.word?.trim()}/${this.search.value.zone?.trim()}/${this.place.geometry?.viewport
        ?.getSouthWest()
        .lng()}/${this.place.geometry?.viewport
        ?.getNorthEast()
        .lng()}/${this.place.geometry?.viewport
        ?.getSouthWest()
        .lat()}/${this.place.geometry?.viewport?.getNorthEast().lat()}`;
      this.router.navigate(['/']).then(() => {
        this.router.navigate([newLink]);
      });
    } else {
      console.log('coucou');

      const newLink = `/annuaire/${this.search.value.word?.trim()}`;
      this.router.navigate(['/']).then(() => {
        this.router.navigate([newLink]);
      });
      // this.router.navigate([
      //   '/annuaire',
      //   `${this.search.value.word?.trim()}`,
      //   `${this.search.value.type}`,
      // ]);
      // this.refreshSchearchList()
      // console.log(2);
    }
    // console.log(this.search.value);
  }
  openMenu() {
    this.menu = !this.menu;
    this.servieMenu = false;
    // console.log(this.menu);
  }

  openServiceMenu() {
    this.servieMenu = !this.servieMenu;
    // console.log(this.servieMenu);
  }
  openMenuMobile() {
    this.menuMobile = !this.menuMobile;
    this.servieMenu = false;
    this.menu = false;

    // console.log(this.menuMobile);
  }
  refreshSchearchList() {
    this.sharedService.callComponent();
  }
  showModal = false;

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  activities: string[] = [];
  activitiesF: string[] = [];
  assurance: string[] = [];
  otherSuggestions: {
    id: string;
    name: string;
    domaine: string;
  }[] = [];

  onSearchChange(): void {
    if (this.search.value.word) {
      this.activities = []; // Suggestions d'activités
      this.activitiesF = []; // Suggestions d'activités
      this.assurance = []; // Suggestions d'activités
      this.otherSuggestions = [];
      if (this.search.value.word.length > 1) {
        this.structureService.suggestio(this.search.value.word).subscribe({
          next: (data) => {
            this.activities = data.activities; // Suggestions d'activités
            console.log(this.activities);
            this.activitiesF = data.activities_f; // Suggestions d'activités
            this.assurance = data.assurance; // Suggestions d'activités
            this.otherSuggestions = data.suggestions; // Autres suggestions
          },

          error: (err) =>
            console.error(
              'Erreur lors de la récupération des suggestions :',
              err
            ),
        });
      }
    } else {
      this.activities = [];
      this.otherSuggestions = [];
    }
  }
  onActivityClick(activity: string): void {
    console.log('Activité sélectionnée :', activity);
    this.search.controls.word.setValue(activity);
    // Effectuer une action, par exemple, effectuer une recherche basée sur cette activité
  }
}
