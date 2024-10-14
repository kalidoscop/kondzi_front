import {
  Component,
  inject,
  OnInit,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { StructureService } from '../../_services/structure.service';
import { Structure } from '../../_model/structure';
import { Loader } from '@googlemaps/js-api-loader';


@Component({
  selector: 'app-annuaire',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './annuaire.component.html',
  styleUrl: './annuaire.component.scss',
})
export class AnnuaireComponent implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  structureService = inject(StructureService);
  markers: google.maps.marker.AdvancedMarkerElement[] = [];
  geocoder = new google.maps.Geocoder();

  loader = new Loader({
    apiKey: 'AIzaSyA3L1IdT9OeeN2GXjJGkTUVVuNFr7AEWx8',
    version: 'weekly',
  });
  // tourStops = [
  //   // {
  //   //   position: { lat: 34.8791806, lng: -111.8265049 },
  //   //   title: 'Boynton Pass',
  //   // },
  //   // {
  //   //   position: { lat: 34.8559195, lng: -111.7988186 },
  //   //   title: 'Airport Mesa',
  //   // },
  //   // {
  //   //   position: { lat: 34.832149, lng: -111.7695277 },
  //   //   title: 'Chapel of the Holy Cross',
  //   // },
  //   // {
  //   //   position: { lat: 34.823736, lng: -111.8001857 },
  //   //   title: 'Red Rock Crossing',
  //   // },
  //   // {
  //   //   position: { lat: 34.800326, lng: -111.7665047 },
  //   //   title: 'Bell Rock',
  //   // },

  //   { position: { lat: 6.13604, lng: 1.223905 }, title: 'Tour Eiffel' },
  //   { position: { lat: 6.152704, lng: 1.210332 }, title: 'Arc de Triomphe' },
  //   { position: { lat: 8.977892, lng: 1.148736 }, title: 'London Eye' },
  //   { position: { lat: 6.263631, lng: 1.152368 }, title: 'Statue of Liberty' },
  //   { position: { lat: 6.199429, lng: 1.180961 }, title: 'Statue of Liberty' },

  //   // { position: { lat: 48.8584, lng: 2.2945 }, title: 'Tour Eiffel' },
  //   // { position: { lat: 48.8738, lng: 2.295 }, title: 'Arc de Triomphe' },
  //   // { position: { lat: 51.5033, lng: -0.1195 }, title: 'London Eye' },
  //   // { position: { lat: 40.6892, lng: -74.0445 }, title: 'Statue of Liberty' },
  // ];

  word: string | null = this.activatedRoute.snapshot.paramMap.get('word');
  type: string | null = this.activatedRoute.snapshot.paramMap.get('type');
  zone: string | null = this.activatedRoute.snapshot.paramMap.get('zone');

  search = new FormGroup({
    word: new FormControl('', Validators.required),
    type: new FormControl('', Validators.required),
    // zone: new FormControl('', Validators.required),
  });

  structures: Structure[] = [];

  ngOnInit(): void {
    if (this.word && this.type && this.zone) {
      this.search = new FormGroup({
        word: new FormControl(this.word, Validators.required),
        type: new FormControl(this.type, Validators.required),
        // zone: new FormControl(this.zone, Validators.required),
      });
      this.loadStructure();
      this.initMap();
    }
  }
  loadStructure() {
    this.structureService.search(this.search.value).subscribe((res) => {
      console.warn(res);
      this.structures = res;
      for (let i = 0; i < this.structures.length; i++) {
        const element = this.structures[i];
        for (let j = 0; j < element.adresse.length; j++) {
          const ad = element.adresse[j];
          const coord = {
            position: { lat: ad.lat, lng: ad.lng },
            title: element.name,
          };
          this.auLocations.push(coord);
        }
      }
    });
  }
  onSubmit() {
    this.loadStructure();
  }
  options: google.maps.MapOptions = {
    mapId: 'DEMO_MAP_ID',
    center: { lat: 6.126432, lng: 1.230597 },
    zoom: 4,
  };

  auLocations: any[] = [];

  async initMap() {
    // const infoWindow = new InfoWindow();
    const { Map, InfoWindow } = (await google.maps.importLibrary(
      'maps'
    )) as google.maps.MapsLibrary;
    const { AdvancedMarkerElement } = (await google.maps.importLibrary(
      'marker'
    )) as google.maps.MarkerLibrary;
    // const {Geocoder} = await google.maps.importLibrary("geocoding")

    const map = new Map(document.getElementById('map') as HTMLElement, {
      center: { lat: 8.817369, lng: 1.259029 },
      zoom: 7,
      mapId: '4504f8b37365c3d0',
    });
    const infoWindow = new InfoWindow();
    for (let i = 0; i < this.auLocations.length; i++) {
      const { position, title } = this.auLocations[i];
      const marker = new AdvancedMarkerElement({
        map,
        position,
        title,
        gmpClickable: true,
      });
      marker.addListener('click', ({}) => {
        // const { target } = domEvent;
        infoWindow.close();
        infoWindow.setContent(marker.title);
        infoWindow.open(marker.map, marker);
      });
      const latlng = { lat: position.lat, lng: position.lng };
      
      await this.geocoder.geocode({ location: latlng }, (results, status) => {
        if (status === 'OK') {
          if (results && results.length > 0) {
            let ville = '';
            for (let j = 0; j < results.length; j++) {
              // const element = array[j];
              if (results[0]) {
                console.log(results[i]);
                const addressComponents = results[0].address_components;
                // console.log(addressComponents);

                addressComponents.forEach((component) => {
                  ville += ' ' + component.long_name; // Ville
                });
                marker.setAttribute('ville', ville);
                // return marker
              }
            }
          }
        } else {
          console.log('Geocoder failed due to: ' + status);
        }
      });
      console.log(marker.getAttribute('ville'));

      this.markers.push(marker);
    }
    this.filterMarkers('Rue des Cocotiers', map);
  }
  

  filterMarkers(query: string, map: any) {
    // const paris = 'paris';
    const lowerCaseQuery = query.toLowerCase();
    console.log('coucou');

    this.markers.forEach((marker) => {
      // console.log('ville'+marker.ville);
      const ville = marker.getAttribute('ville');
      // console.log('ville 3'+ville);
      if (ville) {
        if (!ville.toLowerCase().includes(lowerCaseQuery)) {
          marker.position = null; // Afficher le marqueur
        }
      }

      // Vérifier si la ville ou le quartier contient la valeur de la recherche
    });
  }
}
