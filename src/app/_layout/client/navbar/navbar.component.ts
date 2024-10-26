import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { IconsModule } from '../../../_icons/icons.module';
import { StructureService } from '../../../_services/structure.service';
import { Router, RouterModule } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgClass } from '@angular/common';
import { DataService } from '../../../_services/data.service';
import { ScrollService } from '../../../_services/scroll.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [IconsModule, ReactiveFormsModule, RouterModule, NgClass],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit,OnDestroy {
  ngOnDestroy(): void {
    this.scrollSubscription?.unsubscribe();
  }
  place: google.maps.places.PlaceResult | null = null;

  dataservice = inject(DataService)
  scrollService = inject(ScrollService)
  private scrollSubscription: Subscription | undefined;
  navbarOpaque = false;

  async ngOnInit() {
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
    const autocomplete = await new google.maps.places.Autocomplete(input, options);
    autocomplete.addListener('place_changed', () => {
      console.log('coucou');
      // console.log(autocomplete.)
      const place = autocomplete.getPlace();
      this.place = place
      console.log(place);
    });
    this.scrollSubscription = this.scrollService.navbarOpaque$.subscribe(
      isOpaque => (this.navbarOpaque = isOpaque)
    );
  }
  structureService = inject(StructureService);
  private router = inject(Router);
  menu: boolean = false;

  search = new FormGroup({
    word: new FormControl('', Validators.required),
    zone: new FormControl(''),
    type: new FormControl('', Validators.required),
  });

  async onSubmit() {
    if (this.place) {
      this.router.navigate([
        '/annuaire',
        `${this.search.value.word?.trim()}`,
        `${this.search.value.type}`,
        `${this.search.value.zone?.trim()}`,
        `${this.place.geometry?.viewport?.getSouthWest().lng()}`,
        `${this.place.geometry?.viewport?.getNorthEast().lng()}`,
        `${this.place.geometry?.viewport?.getSouthWest().lat()}`,
        `${this.place.geometry?.viewport?.getNorthEast().lat()}`,
      ]);
      // console.log(1);
      
    }else{
      this.router.navigate([
        '/annuaire',
        `${this.search.value.word?.trim()}`,
        `${this.search.value.type}`,
      ]);
      // console.log(2);
    }
    // console.log(this.search.value);
    
  }
  openMenu() {
    this.menu = !this.menu;
    console.log(this.menu);
  }
}
