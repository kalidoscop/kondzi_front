import {  Component, ElementRef, Inject, inject, OnInit, PLATFORM_ID } from '@angular/core';
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
import { NgClass } from '@angular/common';
import { FooterComponent } from '../component/footer/footer.component';
import { ScrollService } from '../../_services/scroll.service';
import { SharedService } from '../../_services/shared.service';
import { ModalComponent } from '../component/modal/modal.component';
import { IconsModule } from '../../_icons/icons.module';
import { MetaData } from '../../_model/meta';
import { DoctorService } from '../../_services/doctor.service';
import { Doctor } from '../../_model/doctor';
import { RestContriesService } from '../../_services/rest-contries.service';
// import { TwemojiService } from '../../_services/twemoji.service';
import { isPlatformBrowser } from '@angular/common';


@Component({
  selector: 'app-annuaire',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    IconsModule,
    NgClass,
    FooterComponent,
    ModalComponent,
  ],
  templateUrl: './annuaire.component.html',
  styleUrl: './annuaire.component.scss',
})
export class AnnuaireComponent implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  structureService = inject(StructureService);
  doctorService = inject(DoctorService);
  dataservice = inject(DataService);
  private sharedService = inject(SharedService);
  private countryService = inject(RestContriesService);

  // private twemojiService = inject(TwemojiService) 
  private el = inject(ElementRef) 

  selectedIndex = '';
  // markers: google.maps.marker.AdvancedMarkerElement[] = [];
  // geocoder = new google.maps.Geocoder();

  loader = new Loader({
    apiKey: 'AIzaSyA3L1IdT9OeeN2GXjJGkTUVVuNFr7AEWx8',
    version: 'weekly',
  });
  place: google.maps.places.PlaceResult | null = null;

  tourStops: any = [];


  word: string | null = this.activatedRoute.snapshot.paramMap.get('word');
  // type: string | null = this.activatedRoute.snapshot.paramMap.get('type');
  zone: string | null = this.activatedRoute.snapshot.paramMap.get('zone');
  slng: string | null = this.activatedRoute.snapshot.paramMap.get('slng');
  nlng: string | null = this.activatedRoute.snapshot.paramMap.get('nlng');
  slat: string | null = this.activatedRoute.snapshot.paramMap.get('slat');
  nlat: string | null = this.activatedRoute.snapshot.paramMap.get('nlat');

  search1 = new FormGroup({
    type: new FormControl(''),
    countrie: new FormControl(''),
    word: new FormControl('', Validators.required),
    zone: new FormControl(''),
  });
  search2 = new FormGroup({
    type: new FormControl(''),
    countrie: new FormControl(''),
    word: new FormControl('', Validators.required),
    lieu: new FormGroup({
      lngLo: new FormControl(),
      lngHi: new FormControl(),
      latLo: new FormControl(),
      latHi: new FormControl(),
    }),
  });

  structures: Structure[] = [];
  countries: any[] = [];

  doctors: Doctor[] = [];
  meta: MetaData | undefined;
  scrollService = inject(ScrollService);
    constructor(@Inject(PLATFORM_ID) private platformId: Object) {}
  
  async ngOnInit() {
    this.scrollService.setNavbarOpaque(true);
    this.getCountri();
    // if (!this.structures.length) {
      //   this.type.setValue('doc');
      //   this.loadStructure();
      // }
      if (isPlatformBrowser(this.platformId)) {
          await this.loadStructure2();
          this.sharedService.callComponent$.subscribe(() => {
            // this.loadStructure();
            // //console.log('hello evry body');
            window.location.reload();
          });
        }
    // this.loadStructure()
  }

  getCountri() {
    this.countryService.getAfricanCountries().subscribe((res) => {
      // //console.log(res);
      this.countries = res;
      // const number = this.phoneUtil.parseAndKeepRawInput('90059173', 'TG');
      // //console.log(this.phoneUtil.isValidNumberForRegion(number, 'TG'));
    });
  }

  loadStructure2(page?: string, lodDoc: boolean = true) {
    // //console.log(this.type.value);
    if (isPlatformBrowser(this.platformId)) {
      if (this.type.value === 'doc') {
        // //console.log('mami');
  
        if (this.word) {
          if (this.zone && this.slng && this.nlng && this.slat && this.nlat) {
            // //console.log(2);
  
            this.search2 = new FormGroup({
              type: new FormControl(this.type.value),
              countrie: new FormControl(this.countrie.value),
              word: new FormControl(this.word, Validators.required),
              lieu: new FormGroup({
                lngLo: new FormControl(this.slng),
                lngHi: new FormControl(this.nlng),
                latLo: new FormControl(this.slat),
                latHi: new FormControl(this.nlat),
              }),
              // zone: new FormControl(this.zone, Validators.required),
            });
            this.doctorService
              .search(this.search2.value, page)
              .subscribe((res) => {
                // console.warn(res);
                this.doctors = res.data;
                this.meta = res.meta;
                // //console.log(this.doctors);
  
                if (this.doctors.length) {
                  for (let i = 0; i < this.doctors.length; i++) {
                    const element = this.doctors[i];
                    for (let j = 0; j < element.adresse.length; j++) {
                      const ad = element.adresse[j];
                      const coord = {
                        position: { lat: ad.lat, lng: ad.lng },
                        title: `${element.last_name} ${element.first_name}`,
                        structure: element,
                      };
                      this.auLocations.push(coord);
                    }
                  }
                  this.initMap('map');
                } else {
                  //console.log('none');
  
                  this.type.setValue('all');
                  this.loadStructure2(undefined, false);
  
                  this.auLocations = [];
                  this.initMap('map');
                }
              });
          } else {
            // //console.log(1);
  
            this.search1 = new FormGroup({
              type: new FormControl(this.type.value),
              countrie: new FormControl(this.countrie.value),
              word: new FormControl(this.word, Validators.required),
              zone: new FormControl(''),
            });
            this.doctorService
              .search(this.search1.value, page)
              .subscribe((res) => {
                // console.warn(res);
                this.doctors = res.data;
                this.meta = res.meta;
                // //console.log(this.doctors);
  
                if (this.doctors.length) {
                  for (let i = 0; i < this.doctors.length; i++) {
                    const element = this.doctors[i];
                    for (let j = 0; j < element.adresse.length; j++) {
                      const ad = element.adresse[j];
                      const coord = {
                        position: { lat: ad.lat, lng: ad.lng },
                        title: `${element.last_name} ${element.first_name}`,
                        structure: element,
                      };
                      this.auLocations.push(coord);
                    }
                  }
                  this.initMap('map');
                } else {
                  //console.log('none');
                  this.type.setValue('all');
                  this.loadStructure2(undefined, false);
                  this.auLocations = [];
                  this.initMap('map');
                }
              });
          }
        }
      }
      else{
        if (this.word) {
          if (this.zone && this.slng && this.nlng && this.slat && this.nlat) {
            // //console.log(2);
    
            this.search2 = new FormGroup({
              type: new FormControl(this.type.value),
              countrie: new FormControl(this.countrie.value),
              word: new FormControl(this.word, Validators.required),
              lieu: new FormGroup({
                lngLo: new FormControl(this.slng),
                lngHi: new FormControl(this.nlng),
                latLo: new FormControl(this.slat),
                latHi: new FormControl(this.nlat),
              }),
              // zone: new FormControl(this.zone, Validators.required),
            });
            this.structureService
              .search(this.search2.value, page)
              .subscribe((res) => {
                // console.warn(res);
                this.structures = res.data;
                this.meta = res.meta;
                // //console.log(this.structures);
    
                if (this.structures.length) {
                  for (let i = 0; i < this.structures.length; i++) {
                    const element = this.structures[i];
                    for (let j = 0; j < element.adresse.length; j++) {
                      const ad = element.adresse[j];
                      const coord = {
                        position: { lat: ad.lat, lng: ad.lng },
                        title: element.name,
                        structure: element,
                      };
                      this.auLocations.push(coord);
                    }
                  }
                  this.initMap('map');
                } else {
                  if (lodDoc) {
                    this.type.setValue('doc');
                    this.loadStructure2();
                  } else {
                    this.auLocations = [];
                    this.initMap('map');
                  }
                }
              });
          } else {
            // //console.log(1);
    
            this.search1 = new FormGroup({
              type: new FormControl(this.type.value),
              countrie: new FormControl(this.countrie.value),
              word: new FormControl(this.word, Validators.required),
              zone: new FormControl(''),
            });
            this.structureService
              .search(this.search1.value, page)
              .subscribe((res) => {
                // console.warn(res);
                this.structures = res.data;
                this.meta = res.meta;
                // //console.log(this.structures);
                if (this.structures.length) {
                  for (let i = 0; i < this.structures.length; i++) {
                    const element = this.structures[i];
                    for (let j = 0; j < element.adresse.length; j++) {
                      const ad = element.adresse[j];
                      const coord = {
                        position: { lat: ad.lat, lng: ad.lng },
                        title: element.name,
                        structure: element,
                      };
                      this.auLocations.push(coord);
                    }
                  }
                  this.initMap('map');
                } else {
                  if (lodDoc) {
                    this.type.setValue('doc');
                    this.loadStructure2();
                  } else {
                    this.auLocations = [];
                    this.initMap('map');
                  }
                }
              });
          }
        }
  
      }
    }
    
  }

 
  type = new FormControl('all');
  countrie = new FormControl('all');
  onFilter() {
    //console.log(this.type.value);

    this.loadStructure2();
  }

  auLocations: any[] = [];

  async initMap(mapName: string) {
    const { Map, InfoWindow } = (await google.maps.importLibrary(
      'maps'
    )) as google.maps.MapsLibrary;
    const { AdvancedMarkerElement } = (await google.maps.importLibrary(
      'marker'
    )) as google.maps.MarkerLibrary;

    const map = new Map(document.getElementById(mapName) as HTMLElement, {
      // center: { lat: 8, lng: 1.259029 },
      center: { lat: 16, lng: 7 },
      zoom: 3,
      mapId: '4504f8b37365c3d0',
    });
    const infoWindow = new InfoWindow();
    //console.log(this.auLocations);

    for (let i = 0; i < this.auLocations.length; i++) {
      const { position, title, structure } = this.auLocations[i];
      const marker = new AdvancedMarkerElement({
        map,
        position,
        title,
        gmpClickable: true,
      });
      marker.addListener('click', ({}) => {
        // //console.log(structure);

        this.scrollToStudent(structure.id);
        this.selectedIndex = structure.id;
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
  cart = true;

  opencart() {
    this.cart = !this.cart;
  }

  showModal = false;
  async openAll() {
    await this.openModal();
    this.initMap('map2');
  }

  openModal() {
    this.showModal = true;
    this.initMap('map2');
  }

  closeModal() {
    this.showModal = false;
  }

  next(page: string) {
    //console.log(this.activatedRoute.url);

    this.loadStructure2(page);
  }

  see: number = -1;

  seeMore(i: number) {
    if (this.see === i) {
      this.see = -1;
    } else {
      this.see = i;
    }
  }
}




 // loadStructure(page?: string, lodDoc: boolean = true) {
  //   this.doctors = [];
  //   this.structures = [];

  //   // if (this.type.value === 'all') {
  //   //   if (this.word) {
  //   //     if (this.zone && this.slng && this.nlng && this.slat && this.nlat) {
  //         //console.log(2);

  //   //       this.search2 = new FormGroup({
  //   //         type: new FormControl(),
  //   //         countrie: new FormControl(),
  //   //         word: new FormControl(this.word, Validators.required),
  //   //         lieu: new FormGroup({
  //   //           lngLo: new FormControl(this.slng),
  //   //           lngHi: new FormControl(this.nlng),
  //   //           latLo: new FormControl(this.slat),
  //   //           latHi: new FormControl(this.nlat),
  //   //         }),
  //   //         // zone: new FormControl(this.zone, Validators.required),
  //   //       });
  //   //       this.structureService
  //   //         .search(this.search2.value, page)
  //   //         .subscribe((res) => {
  //   //           // console.warn(res);
  //   //           this.structures = res.data;
  //   //           this.meta = res.meta;
  //             // //console.log(this.structures);

  //   //           if (this.structures.length) {
  //   //             for (let i = 0; i < this.structures.length; i++) {
  //   //               const element = this.structures[i];
  //   //               for (let j = 0; j < element.adresse.length; j++) {
  //   //                 const ad = element.adresse[j];
  //   //                 const coord = {
  //   //                   position: { lat: ad.lat, lng: ad.lng },
  //   //                   title: element.name,
  //   //                   structure: element,
  //   //                 };
  //   //                 this.auLocations.push(coord);
  //   //               }
  //   //             }
    //             this.initMap('map');
  //   //           } else {
  //   //             if (lodDoc) {
  //   //               this.type.setValue('doc');
  //   //               this.loadStructure();
  //   //             } else {
  //   //               this.auLocations = [];
    //               this.initMap('map');
  //   //             }
  //   //           }
  //   //         });
  //   //     } else {
  //         //console.log(1);

  //   //       this.search1 = new FormGroup({
  //   //         type: new FormControl(),
  //   //         countrie: new FormControl(),
  //   //         word: new FormControl(this.word, Validators.required),
  //   //         zone: new FormControl(''),
  //   //       });
  //   //       this.structureService
  //   //         .search(this.search1.value, page)
  //   //         .subscribe((res) => {
  //   //           // console.warn(res);
  //   //           this.structures = res.data;
  //   //           this.meta = res.meta;
  //             // //console.log(this.structures);

  //   //           if (this.structures.length) {
  //   //             for (let i = 0; i < this.structures.length; i++) {
  //   //               const element = this.structures[i];
  //   //               for (let j = 0; j < element.adresse.length; j++) {
  //   //                 const ad = element.adresse[j];
  //   //                 const coord = {
  //   //                   position: { lat: ad.lat, lng: ad.lng },
  //   //                   title: element.name,
  //   //                   structure: element,
  //   //                 };
  //   //                 this.auLocations.push(coord);
  //   //               }
  //   //             }
    //             this.initMap('map');
  //   //           } else {
  //   //             if (lodDoc) {
  //   //               this.type.setValue('doc');
  //   //               this.loadStructure();
  //   //             } else {
  //   //               this.auLocations = [];
    //               this.initMap('map');
  //   //             }
  //   //           }
  //   //         });
  //   //     }
  //   //   }
  //   // }

  //   // for doctor
  //   if (this.type.value === 'doc') {
  //     // //console.log('mami');

  //     if (this.word) {
  //       if (this.zone && this.slng && this.nlng && this.slat && this.nlat) {
  //         // //console.log(2);

  //         this.search2 = new FormGroup({
  //           type: new FormControl(this.type.value),
  //           countrie: new FormControl(),
  //           word: new FormControl(this.word, Validators.required),
  //           lieu: new FormGroup({
  //             lngLo: new FormControl(this.slng),
  //             lngHi: new FormControl(this.nlng),
  //             latLo: new FormControl(this.slat),
  //             latHi: new FormControl(this.nlat),
  //           }),
  //           // zone: new FormControl(this.zone, Validators.required),
  //         });
  //         this.doctorService
  //           .search(this.search2.value, page)
  //           .subscribe((res) => {
  //             // console.warn(res);
  //             this.doctors = res.data;
  //             this.meta = res.meta;
  //             // //console.log(this.doctors);

  //             if (this.doctors.length) {
  //               for (let i = 0; i < this.doctors.length; i++) {
  //                 const element = this.doctors[i];
  //                 for (let j = 0; j < element.adresse.length; j++) {
  //                   const ad = element.adresse[j];
  //                   const coord = {
  //                     position: { lat: ad.lat, lng: ad.lng },
  //                     title: `${element.last_name} ${element.first_name}`,
  //                     structure: element,
  //                   };
  //                   this.auLocations.push(coord);
  //                 }
  //               }
                // this.initMap('map');
  //             } else {
  //               //console.log('none');

  //               this.type.setValue('all');
  //               this.loadStructure(undefined, false);

  //               this.auLocations = [];
                // this.initMap('map');
  //             }
  //           });
  //       } else {
  //         // //console.log(1);

  //         this.search1 = new FormGroup({
  //           type: new FormControl(this.type.value),
  //           countrie: new FormControl(),
  //           word: new FormControl(this.word, Validators.required),
  //           zone: new FormControl(''),
  //         });
  //         this.doctorService
  //           .search(this.search1.value, page)
  //           .subscribe((res) => {
  //             // console.warn(res);
  //             this.doctors = res.data;
  //             this.meta = res.meta;
  //             // //console.log(this.doctors);

  //             if (this.doctors.length) {
  //               for (let i = 0; i < this.doctors.length; i++) {
  //                 const element = this.doctors[i];
  //                 for (let j = 0; j < element.adresse.length; j++) {
  //                   const ad = element.adresse[j];
  //                   const coord = {
  //                     position: { lat: ad.lat, lng: ad.lng },
  //                     title: `${element.last_name} ${element.first_name}`,
  //                     structure: element,
  //                   };
  //                   this.auLocations.push(coord);
  //                 }
  //               }
                // this.initMap('map');
  //             } else {
  //               //console.log('none');
  //               this.type.setValue('all');
  //               this.loadStructure(undefined, false);
  //               this.auLocations = [];
                // this.initMap('map');
  //             }
  //           });
  //       }
  //     }
  //   } // for doctor
  //   else {
  //     if (this.word) {
  //       if (this.zone && this.slng && this.nlng && this.slat && this.nlat) {
  //         // //console.log(2);

  //         this.search2 = new FormGroup({
  //           type: new FormControl(this.type.value),
  //           countrie: new FormControl(),
  //           word: new FormControl(this.word, Validators.required),
  //           lieu: new FormGroup({
  //             lngLo: new FormControl(this.slng),
  //             lngHi: new FormControl(this.nlng),
  //             latLo: new FormControl(this.slat),
  //             latHi: new FormControl(this.nlat),
  //           }),
  //           // zone: new FormControl(this.zone, Validators.required),
  //         });
  //         this.structureService
  //           .search(this.search2.value, page)
  //           .subscribe((res) => {
  //             // console.warn(res);
  //             this.structures = res.data;
  //             this.meta = res.meta;
  //             // //console.log(this.structures);

  //             if (this.structures.length) {
  //               for (let i = 0; i < this.structures.length; i++) {
  //                 const element = this.structures[i];
  //                 for (let j = 0; j < element.adresse.length; j++) {
  //                   const ad = element.adresse[j];
  //                   const coord = {
  //                     position: { lat: ad.lat, lng: ad.lng },
  //                     title: element.name,
  //                     structure: element,
  //                   };
  //                   this.auLocations.push(coord);
  //                 }
  //               }
                // this.initMap('map');
  //             } else {
  //               if (lodDoc) {
  //                 this.type.setValue('doc');
  //                 this.loadStructure();
  //               } else {
  //                 this.auLocations = [];
                  // this.initMap('map');
  //               }
  //             }
  //           });
  //       } else {
  //         // //console.log(1);

  //         this.search1 = new FormGroup({
  //           type: new FormControl(this.type.value),
  //           countrie: new FormControl(),
  //           word: new FormControl(this.word, Validators.required),
  //           zone: new FormControl(''),
  //         });
  //         this.structureService
  //           .search(this.search1.value, page)
  //           .subscribe((res) => {
  //             // console.warn(res);
  //             this.structures = res.data;
  //             this.meta = res.meta;
  //             // //console.log(this.structures);
  //             if (this.structures.length) {
  //               for (let i = 0; i < this.structures.length; i++) {
  //                 const element = this.structures[i];
  //                 for (let j = 0; j < element.adresse.length; j++) {
  //                   const ad = element.adresse[j];
  //                   const coord = {
  //                     position: { lat: ad.lat, lng: ad.lng },
  //                     title: element.name,
  //                     structure: element,
  //                   };
  //                   this.auLocations.push(coord);
  //                 }
  //               }
                // this.initMap('map');
  //             } else {
  //               if (lodDoc) {
  //                 this.type.setValue('doc');
  //                 this.loadStructure();
  //               } else {
  //                 this.auLocations = [];
                  // this.initMap('map');
  //               }
  //             }
  //           });
  //       }
  //     }
  //   }
  // }