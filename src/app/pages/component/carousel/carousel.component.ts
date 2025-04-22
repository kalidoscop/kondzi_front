import { Component, inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StructureService } from '../../../_services/structure.service';
import { Router } from '@angular/router';

interface CarouselImage {
  imageSrc: string;
  imageAlt: string;
  text: string;
}
@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss',
})
export class CarouselComponent implements OnInit {
  @Input() images: CarouselImage[] = [];
  @Input() simple: boolean = false;
  structureService = inject(StructureService);
    private router = inject(Router);
  

  selectedIndex = 0;

  suggestion: string[] = [];
  otherSuggestions: {
    id: string;
    name: string;
    domaine: string;
  }[] = [];
  search = new FormGroup({
    word: new FormControl('', Validators.required),
    zone: new FormControl(''),
  });
  // place: google.maps.places.PlaceResult | null = null;

  async onSubmit() {
    // if (this.place) {
    //   const newLink = `/annuaire/${this.search.value.word?.trim()}/${this.search.value.zone?.trim()}/${this.place.geometry?.viewport
    //     ?.getSouthWest()
    //     .lng()}/${this.place.geometry?.viewport
    //     ?.getNorthEast()
    //     .lng()}/${this.place.geometry?.viewport
    //     ?.getSouthWest()
    //     .lat()}/${this.place.geometry?.viewport?.getNorthEast().lat()}`;
    //   this.router.navigate(['/']).then(() => {
    //     this.router.navigate([newLink]);
    //   });
    // } else {
    //   console.log('coucou');

    //   const newLink = `/annuaire/${this.search.value.word?.trim()}`;
    //   this.router.navigate(['/']).then(() => {
    //     this.router.navigate([newLink]);
    //   });
    //   // this.router.navigate([
    //   //   '/annuaire',
    //   //   `${this.search.value.word?.trim()}`,
    //   //   `${this.search.value.type}`,
    //   // ]);
    //   // this.refreshSchearchList()
    //   // console.log(2);
    // }
    const newLink = `/annuaire/${this.search.value.word?.trim()}`;
    this.router.navigate(['/']).then(() => {
      this.router.navigate([newLink]);
    });
    
    // console.log(this.search.value);
  }
  ngOnInit(): void {
    // console.log(this.images);

    setInterval(() => {
      this.deroule();
      // console.log(this.selectedIndex);
    }, 4000);

    // throw new Error('Method not implemented.');
  }
  onActivityClick(activity: string): void {
    console.log('Activité sélectionnée :', activity);
    this.search.controls.word.setValue(activity);
    this.closeSuggestion();
    // Effectuer une action, par exemple, effectuer une recherche basée sur cette activité
  }

  closeSuggestion() {
    this.suggestion = []; // Suggestions d'activités
    // this.activitiesF = []; // Suggestions d'activités
    // this.assurance = []; // Suggestions d'activités
    // this.otherSuggestions = [];
    // this.speciality = [];
    // this.name = [];
    // this.doc_name = [];
    // this.doc_activity = [];
  }
  onSearchChange(): void {
    if (this.search.value.word) {
      this.suggestion = []; // Suggestions d'activités
      // this.activitiesF = []; // Suggestions d'activités
      // this.assurance = []; // Suggestions d'activités
      // this.otherSuggestions = [];
      // this.speciality = [];
      // this.name = [];
      // this.doc_name = [];
      // this.doc_activity = [];
      if (this.search.value.word.length > 1) {
        this.structureService.suggestio(this.search.value.word).subscribe({
          next: (data) => {
            this.suggestion = data.suggestion; // Suggestions d'activités
            // this.activitiesF = data.activities_f; // Suggestions d'activités
            // this.assurance = data.assurance; // Suggestions d'activités
            // // this.otherSuggestions = data.suggestions; // Autres suggestions
            // this.speciality = data.speciality; // Autres suggestions
            // this.name = data.name; // Autres suggestions
            // this.doc_name = data.doc_name; // Autres suggestions
            // this.doc_activity = data.doc_activity; // Autres suggestions
            // console.log(this.doc_name);
          },

          error: (err) =>
            console.error(
              'Erreur lors de la récupération des suggestions :',
              err
            ),
        });
      }
    } else {
      this.suggestion = [];
      this.otherSuggestions = [];
    }
  }

  deroule() {
    // console.log(this.selectedIndex);

    if (this.selectedIndex === this.images.length - 1) {
      this.selectedIndex = 0;
    } else {
      this.selectedIndex += 1;
    }
  }
}
