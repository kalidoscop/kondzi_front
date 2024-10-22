import { Component, inject, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [IconsModule, ReactiveFormsModule, RouterModule, NgClass],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  place: google.maps.places.PlaceResult | null = null;

  dataservice = inject(DataService)

  ngOnInit(): void {
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
    const autocomplete = new google.maps.places.Autocomplete(input, options);
    autocomplete.addListener('place_changed', () => {
      console.log('coucou');
      // console.log(autocomplete.)
      const place = autocomplete.getPlace();
      this.place = place
      console.log(place);
    });
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
    // console.log(this.search.value);
    // console.log('coucou');
    const obj = {
      id: 1,
      name: 'Hôpital Central',
      location: {
        lat: 48.8588443,
        lng: 2.2943506
      }
    };
    // console.log(this.place);
    
    if (this.place) {
      if (this.place.name) {
        
        this.search.controls.zone.setValue(this.place.name)
      }
     await this.dataservice.emitEvent(this.place)
    }
    else if (this.place === null) {
      // console.log('cou');
      
      
     await  this.dataservice.emitEvent(obj)
    }
    console.log(this.search.value);
    if (this.place) {
      this.router.navigate([
        '/annuaire',
        `${this.search.value.word?.trim()}`,
        `${this.search.value.zone?.trim()}`,
        `${this.search.value.type}`,
        `${this.place.geometry?.viewport?.getSouthWest().lng()}`,
        `${this.place.geometry?.viewport?.getNorthEast().lng()}`,
        `${this.place.geometry?.viewport?.getSouthWest().lat()}`,
        `${this.place.geometry?.viewport?.getNorthEast().lat()}`,
      ]);
    }
  }
  openMenu() {
    this.menu = !this.menu;
    console.log(this.menu);
  }
}
