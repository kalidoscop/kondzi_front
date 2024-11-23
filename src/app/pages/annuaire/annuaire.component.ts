import { Component, inject, OnInit } from '@angular/core';
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
import { DataService } from '../../_services/data.service';
import { NgClass, NgFor } from '@angular/common';
import { FooterComponent } from '../component/footer/footer.component';
import { ScrollService } from '../../_services/scroll.service';
import { SharedService } from '../../_services/shared.service';
import { ModalComponent } from '../component/modal/modal.component';
import { IconsModule } from '../../_icons/icons.module';

@Component({
  selector: 'app-annuaire',
  standalone: true,
  imports: [ReactiveFormsModule,IconsModule, NgFor,NgClass,FooterComponent, ModalComponent],
  templateUrl: './annuaire.component.html',
  styleUrl: './annuaire.component.scss',
})
export class AnnuaireComponent implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  structureService = inject(StructureService);
  dataservice = inject(DataService);
  private sharedService = inject(SharedService);

  selectedIndex =''
  markers: google.maps.marker.AdvancedMarkerElement[] = [];
  geocoder = new google.maps.Geocoder();

  loader = new Loader({
    apiKey: 'AIzaSyA3L1IdT9OeeN2GXjJGkTUVVuNFr7AEWx8',
    version: 'weekly',
  });
  place: google.maps.places.PlaceResult | null = null;

  tourStops: any = [];
  

  word: string | null = this.activatedRoute.snapshot.paramMap.get('word');
  type: string | null = this.activatedRoute.snapshot.paramMap.get('type');
  zone: string | null = this.activatedRoute.snapshot.paramMap.get('zone');
  slng: string | null = this.activatedRoute.snapshot.paramMap.get('slng');
  nlng: string | null = this.activatedRoute.snapshot.paramMap.get('nlng');
  slat: string | null = this.activatedRoute.snapshot.paramMap.get('slat');
  nlat: string | null = this.activatedRoute.snapshot.paramMap.get('nlat');

  search1 = new FormGroup({
    word: new FormControl('', Validators.required),
    type: new FormControl('', Validators.required),
    zone: new FormControl(''),
  });
  search2 = new FormGroup({
    word: new FormControl('', Validators.required),
    type: new FormControl('', Validators.required),
    lieu: new FormGroup({
      lngLo: new FormControl(),
      lngHi: new FormControl(),
      latLo: new FormControl(),
      latHi: new FormControl(),
    }),
  });

  structures: Structure[] = [];
  scrollService = inject(ScrollService)


  async ngOnInit() {
    this.scrollService.setNavbarOpaque(true);
    await this.loadStructure();
    this.sharedService.callComponent$.subscribe(() => {
      // this.loadStructure();
      // console.log('hello evry body');
      window.location.reload();
      
    });
    // this.loadStructure()
  }

  loadStructure() {
    if (this.word && this.type) {
      if (this.zone && this.slng && this.nlng && this.slat && this.nlat) {
        // console.log(2);

        this.search2 = new FormGroup({
          word: new FormControl(this.word, Validators.required),
          type: new FormControl(this.type, Validators.required),
          lieu: new FormGroup({
            lngLo: new FormControl(this.slng),
            lngHi: new FormControl(this.nlng),
            latLo: new FormControl(this.slat),
            latHi: new FormControl(this.nlat),
          }),
          // zone: new FormControl(this.zone, Validators.required),
        });
        this.structureService.search(this.search2.value).subscribe((res) => {
          // console.warn(res);
          this.structures = res;
          console.log(this.structures);

          for (let i = 0; i < this.structures.length; i++) {
            const element = this.structures[i];
            for (let j = 0; j < element.adresse.length; j++) {
              const ad = element.adresse[j];
              const coord = {
                position: { lat: ad.lat, lng: ad.lng },
                title: element.name,
                structure:element

              };
              this.auLocations.push(coord);
            }
          }
          this.initMap('map');
        });
      } else {
        // console.log(1);

        this.search1 = new FormGroup({
          word: new FormControl(this.word, Validators.required),
          type: new FormControl(this.type, Validators.required),
          zone: new FormControl(''),
        });
        this.structureService.search(this.search1.value).subscribe((res) => {
          // console.warn(res);
          this.structures = res;
          console.log(this.structures);

          for (let i = 0; i < this.structures.length; i++) {
            const element = this.structures[i];
            for (let j = 0; j < element.adresse.length; j++) {
              const ad = element.adresse[j];
              const coord = {
                position: { lat: ad.lat, lng: ad.lng },
                title: element.name,
                structure:element
              };
              this.auLocations.push(coord);
            }
          }
          this.initMap('map');
        });
      }
    }
  }
  onSubmit() {
    this.loadStructure();
  }

  auLocations: any[] = [];

  async initMap(mapName:string) {
    const { Map, InfoWindow } = (await google.maps.importLibrary(
      'maps'
    )) as google.maps.MapsLibrary;
    const { AdvancedMarkerElement } = (await google.maps.importLibrary(
      'marker'
    )) as google.maps.MarkerLibrary;

    const map = new Map(document.getElementById(mapName) as HTMLElement, {
      center: { lat: 8.3, lng: 1.259029 },
      zoom: 7,
      mapId: '4504f8b37365c3d0',
    });
    const infoWindow = new InfoWindow();
    console.log(this.auLocations);

    for (let i = 0; i < this.auLocations.length; i++) {
      const { position, title,structure } = this.auLocations[i];
      const marker = new AdvancedMarkerElement({
        map,
        position,
        title,
        gmpClickable: true,
      });
      marker.addListener('click', ({}) => {
        // console.log(structure);
        
        this.scrollToStudent(structure.id)
        this.selectedIndex=structure.id
        infoWindow.close();
        infoWindow.setContent(marker.title);
        infoWindow.open(marker.map, marker);
      });
    }
  }
  scrollToStudent(studentId: string) {
    const element = document.querySelector(`#structure-${studentId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }
  cart = true

  opencart(){
    this.cart=!this.cart
  }

  showModal = false;
  async openAll(){
    await this.openModal()
    this.initMap('map2');
  }

  openModal() {
    this.showModal = true;
    // this.initMap('map2');
  }

  closeModal() {
    this.showModal = false;
  }
}


















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
  //   { position: { lat: 6.13604, lng: 1.223905 }, title: 'Lieu 1' },
  //   { position: { lat: 6.1385, lng: 1.2247 }, title: 'Lieu 2' },
  //   { position: { lat: 6.13925, lng: 1.225105 }, title: 'Lieu 3' },
  //   { position: { lat: 6.1359, lng: 1.220945 }, title: 'Lieu 4' },
  //   { position: { lat: 6.134, lng: 1.2199 }, title: 'Lieu 5' },
  //   { position: { lat: 6.1375, lng: 1.2225 }, title: 'Lieu 6' },
  //   { position: { lat: 6.1412, lng: 1.2268 }, title: 'Lieu 7' },
  //   { position: { lat: 6.13245, lng: 1.22 }, title: 'Lieu 8' },
  //   { position: { lat: 6.1305, lng: 1.21845 }, title: 'Lieu 9' },
  //   { position: { lat: 6.1421, lng: 1.22835 }, title: 'Lieu 10' },
  //   { position: { lat: 6.1336, lng: 1.2216 }, title: 'Lieu 11' },
  //   { position: { lat: 6.1451, lng: 1.2294 }, title: 'Lieu 12' },
  //   { position: { lat: 6.1487, lng: 1.2316 }, title: 'Lieu 13' },
  //   { position: { lat: 6.1498, lng: 1.2335 }, title: 'Lieu 14' },
  //   { position: { lat: 6.1352, lng: 1.2257 }, title: 'Lieu 15' },
  //   { position: { lat: 6.1368, lng: 1.2303 }, title: 'Lieu 16' },
  //   { position: { lat: 6.141, lng: 1.2218 }, title: 'Lieu 17' },
  //   { position: { lat: 6.1431, lng: 1.2265 }, title: 'Lieu 18' },
  //   { position: { lat: 6.1505, lng: 1.2357 }, title: 'Lieu 19' },
  //   { position: { lat: 6.148, lng: 1.2368 }, title: 'Lieu 20' },
  //   { position: { lat: 6.1475, lng: 1.233 }, title: 'Lieu 21' },
  //   { position: { lat: 6.1516, lng: 1.238 }, title: 'Lieu 22' },
  //   { position: { lat: 6.1397, lng: 1.2244 }, title: 'Lieu 23' },
  //   { position: { lat: 6.1358, lng: 1.2202 }, title: 'Lieu 24' },
  //   { position: { lat: 6.1325, lng: 1.2178 }, title: 'Lieu 25' },
  //   { position: { lat: 6.1469, lng: 1.235 }, title: 'Lieu 26' },
  //   { position: { lat: 6.1437, lng: 1.2318 }, title: 'Lieu 27' },
  //   { position: { lat: 6.1423, lng: 1.2274 }, title: 'Lieu 28' },
  //   { position: { lat: 6.131, lng: 1.2195 }, title: 'Lieu 29' },
  //   { position: { lat: 6.1378, lng: 1.2236 }, title: 'Lieu 30' },
  //   { position: { lat: 6.1458, lng: 1.2292 }, title: 'Lieu 31' },
  //   { position: { lat: 6.1523, lng: 1.2361 }, title: 'Lieu 32' },
  //   { position: { lat: 6.154, lng: 1.2395 }, title: 'Lieu 33' },
  //   { position: { lat: 6.1535, lng: 1.2418 }, title: 'Lieu 34' },
  //   { position: { lat: 6.1366, lng: 1.2207 }, title: 'Lieu 35' },
  //   { position: { lat: 6.147, lng: 1.2323 }, title: 'Lieu 36' },
  //   { position: { lat: 6.1353, lng: 1.2231 }, title: 'Lieu 37' },
  //   { position: { lat: 6.1502, lng: 1.2387 }, title: 'Lieu 38' },
  //   { position: { lat: 6.1518, lng: 1.2402 }, title: 'Lieu 39' },
  //   { position: { lat: 6.1307, lng: 1.217 }, title: 'Lieu 40' },
  //   { position: { lat: 6.1318, lng: 1.2192 }, title: 'Lieu 41' },
  //   { position: { lat: 6.1403, lng: 1.2242 }, title: 'Lieu 42' },
  //   { position: { lat: 6.1348, lng: 1.2225 }, title: 'Lieu 43' },
  //   { position: { lat: 6.1532, lng: 1.2429 }, title: 'Lieu 44' },
  //   { position: { lat: 6.1445, lng: 1.2313 }, title: 'Lieu 45' },
  //   { position: { lat: 6.14, lng: 1.2264 }, title: 'Lieu 46' },
  //   { position: { lat: 6.1435, lng: 1.2291 }, title: 'Lieu 47' },
  //   { position: { lat: 6.1491, lng: 1.2352 }, title: 'Lieu 48' },
  //   { position: { lat: 6.1507, lng: 1.237 }, title: 'Lieu 49' },
  //   { position: { lat: 6.1548, lng: 1.2397 }, title: 'Lieu 50' },
  //   { position: { lat: 6.139, lng: 1.224 }, title: 'Lieu 51' },
  //   { position: { lat: 6.1465, lng: 1.2341 }, title: 'Lieu 52' },
  //   { position: { lat: 6.1369, lng: 1.2209 }, title: 'Lieu 53' },
  //   { position: { lat: 6.1419, lng: 1.2286 }, title: 'Lieu 54' },
  //   { position: { lat: 6.1527, lng: 1.2404 }, title: 'Lieu 55' },
  //   { position: { lat: 6.1332, lng: 1.2215 }, title: 'Lieu 56' },
  //   { position: { lat: 6.1374, lng: 1.223 }, title: 'Lieu 57' },
  //   { position: { lat: 6.1483, lng: 1.2364 }, title: 'Lieu 58' },
  //   { position: { lat: 6.1543, lng: 1.243 }, title: 'Lieu 59' },
  //   { position: { lat: 6.13, lng: 1.2173 }, title: 'Lieu 60' },
  //   { position: { lat: 6.1357, lng: 1.2233 }, title: 'Lieu 61' },
  //   { position: { lat: 6.143, lng: 1.2295 }, title: 'Lieu 62' },
  //   { position: { lat: 6.15, lng: 1.2389 }, title: 'Lieu 63' },
  //   { position: { lat: 6.1372, lng: 1.2224 }, title: 'Lieu 64' },
  //   { position: { lat: 6.1442, lng: 1.2305 }, title: 'Lieu 65' },
  //   { position: { lat: 6.1538, lng: 1.2419 }, title: 'Lieu 66' },
  //   { position: { lat: 6.1416, lng: 1.2279 }, title: 'Lieu 67' },
  //   { position: { lat: 6.1362, lng: 1.2203 }, title: 'Lieu 68' },
  //   { position: { lat: 6.1384, lng: 1.2246 }, title: 'Lieu 69' },
  //   { position: { lat: 6.1521, lng: 1.2393 }, title: 'Lieu 70' },
  //   { position: { lat: 6.1343, lng: 1.2217 }, title: 'Lieu 71' },
  //   { position: { lat: 6.1462, lng: 1.2339 }, title: 'Lieu 72' },
  //   { position: { lat: 6.1495, lng: 1.2356 }, title: 'Lieu 73' },
  //   { position: { lat: 6.1546, lng: 1.2423 }, title: 'Lieu 74' },
  //   { position: { lat: 6.1338, lng: 1.2229 }, title: 'Lieu 75' },
  //   { position: { lat: 6.1381, lng: 1.2233 }, title: 'Lieu 76' },
  //   { position: { lat: 6.145, lng: 1.2312 }, title: 'Lieu 77' },
  //   { position: { lat: 6.1512, lng: 1.2378 }, title: 'Lieu 78' },
  //   { position: { lat: 6.1529, lng: 1.2413 }, title: 'Lieu 79' },
  //   { position: { lat: 6.1371, lng: 1.2204 }, title: 'Lieu 80' },
  //   { position: { lat: 6.1398, lng: 1.225 }, title: 'Lieu 81' },
  //   { position: { lat: 6.1533, lng: 1.2409 }, title: 'Lieu 82' },
  //   { position: { lat: 6.1322, lng: 1.2201 }, title: 'Lieu 83' },
  //   { position: { lat: 6.1447, lng: 1.2317 }, title: 'Lieu 84' },
  //   { position: { lat: 6.1545, lng: 1.2432 }, title: 'Lieu 85' },
  //   { position: { lat: 6.1341, lng: 1.2219 }, title: 'Lieu 86' },
  //   { position: { lat: 6.137, lng: 1.2237 }, title: 'Lieu 87' },
  //   { position: { lat: 6.1509, lng: 1.2381 }, title: 'Lieu 88' },
  //   { position: { lat: 6.1531, lng: 1.2415 }, title: 'Lieu 89' },
  //   { position: { lat: 6.1315, lng: 1.2202 }, title: 'Lieu 90' },
  //   { position: { lat: 6.1449, lng: 1.2308 }, title: 'Lieu 91' },
  //   { position: { lat: 6.1525, lng: 1.241 }, title: 'Lieu 92' },
  //   { position: { lat: 6.1402, lng: 1.2253 }, title: 'Lieu 93' },
  //   { position: { lat: 6.1539, lng: 1.2411 }, title: 'Lieu 94' },
  //   { position: { lat: 6.1484, lng: 1.2359 }, title: 'Lieu 95' },
  //   { position: { lat: 6.1541, lng: 1.2435 }, title: 'Lieu 96' },
  //   { position: { lat: 6.1365, lng: 1.2221 }, title: 'Lieu 97' },
  //   { position: { lat: 6.1453, lng: 1.2325 }, title: 'Lieu 98' },
  //   { position: { lat: 6.1515, lng: 1.2373 }, title: 'Lieu 99' },
  //   { position: { lat: 6.153, lng: 1.2405 }, title: 'Lieu 100' },

  //   // { position: { lat: 48.8584, lng: 2.2945 }, title: 'Tour Eiffel' },
  //   // { position: { lat: 48.8738, lng: 2.295 }, title: 'Arc de Triomphe' },
  //   // { position: { lat: 51.5033, lng: -0.1195 }, title: 'London Eye' },
  //   // { position: { lat: 40.6892, lng: -74.0445 }, title: 'Statue of Liberty' },
  // ];


// async loadPlace() {
//   if (this.word && this.type && this.zone) {
//     this.dataservice.events$.subscribe(async (event) => {
//       console.log('Received event:', event);
//       this.place = event;
//       // console.log();

//       this.search = new FormGroup({
//         word: new FormControl(this.word, Validators.required),
//         type: new FormControl(this.type, Validators.required),
//         lieu: new FormGroup({
//           lngLo: new FormControl(
//             this.place.geometry?.viewport?.getSouthWest().lng()
//           ),
//           lngHi: new FormControl(
//             this.place.geometry?.viewport?.getNorthEast().lng()
//           ),
//           latLo: new FormControl(
//             this.place.geometry?.viewport?.getSouthWest().lat()
//           ),
//           latHi: new FormControl(
//             this.place.geometry?.viewport?.getNorthEast().lat()
//           ),
//         }),
//         // zone: new FormControl(this.zone, Validators.required),
//       });
//       this.structureService.search(this.search.value).subscribe((res) => {
//         // console.warn(res);
//         this.structures = res;
//         console.log(this.structures);

//         for (let i = 0; i < this.structures.length; i++) {
//           const element = this.structures[i];
//           for (let j = 0; j < element.adresse.length; j++) {
//             const ad = element.adresse[j];
//             const coord = {
//               position: { lat: ad.lat, lng: ad.lng },
//               title: element.name,
//             };
//             this.auLocations.push(coord);
//           }
//         }
//         // this.filter();
//         this.initMap();
//       });
//     });
//     // this.tourStops = this.generateRandomLocations(600);
//     // this.filter();
//     // console.log(this.tourStops);
//   }
// }

// filter() {
//   // console.log(this.tourStops);

//   // const bounds = {
//   //   latMin: 6.2328239,  // Latitude minimale
//   //   latMax: 6.301273999999999,  // Latitude maximale
//   //   lonMin: 1.108379,  // Longitude minimale
//   //   lonMax: 1.19238   // Longitude maximale
//   // };
//   // const bounds = {
//   //   latMin: 6.179296319708498, // Latitude minimale
//   //   latMax: 6.181994280291502, // Latitude maximale
//   //   lonMin: 1.142679419708498, // Longitude minimale
//   //   lonMax: 1.1441558 // Longitude maximale
//   // };

//   const bounds = {
//     latMin: 6.191296299999999, // Latitude minimale
//     latMax: 6.2112314, // Latitude maximale
//     lonMin: 1.1867021, // Longitude minimale
//     lonMax: 1.206464, // Longitude maximale
//   };
//   // const bounds = {
//   //   latMin: 6.1135871,  // Latitude minimale
//   //   latMax: 6.2510563,  // Latitude maximale
//   //   lonMin: 1.1121082,  // Longitude minimale
//   //   lonMax: 1.3812733   // Longitude maximale
//   // };
//   this.auLocations = this.auLocations.filter(
//     (coord: any) =>
//       coord.position.lat >= bounds.latMin &&
//       coord.position.lat <= bounds.latMax &&
//       coord.position.lng >= bounds.lonMin &&
//       coord.position.lng <= bounds.lonMax
//   );
//   console.log(this.tourStops.length);
// }

// filterMarkers(query: string, map: any) {
//   // const paris = 'paris';
//   const lowerCaseQuery = query.toLowerCase();
//   console.log('coucou');

//   this.markers.forEach((marker) => {
//     // console.log('ville'+marker.ville);
//     const ville = marker.getAttribute('ville');
//     // console.log('ville 3'+ville);
//     if (ville) {
//       if (!ville.toLowerCase().includes(lowerCaseQuery)) {
//         marker.position = null; // Afficher le marqueur
//       }
//     }

//     // Vérifier si la ville ou le quartier contient la valeur de la recherche
//   });
// }

// options: google.maps.MapOptions = {
//   mapId: 'DEMO_MAP_ID',
//   center: { lat: 6.126432, lng: 1.230597 },
//   zoom: 4,
// };

// getRandomCoordinate(min: number, max: number) {
//   return Math.random() * (max - min) + min;
// }

// generateRandomLocations(numLocations: number) {
//   const locations = [];

//   // Limites géographiques de la région maritime (approximatif)
//   // latMin: 6.179296319708498, // Latitude minimale
//   //   latMax: 6.181994280291502, // Latitude maximale
//   //   lonMin: 1.142679419708498, // Longitude minimale
//   //   lonMax: 1.1441558
//   const latMin = 6.1135871;
//   const latMax = 6.2510563;
//   const lngMin = 1.1121082;
//   const lngMax = 1.3812733;

//   for (let i = 0; i < numLocations; i++) {
//     const lat = this.getRandomCoordinate(latMin, latMax);
//     const lng = this.getRandomCoordinate(lngMin, lngMax);
//     locations.push({
//       position: { lat: lat, lng: lng },
//       title: `Lieu ${i + 1}`,
//     });
//   }

//   return locations;
// }
