import { Component, inject } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IconsModule } from '../../../../_icons/icons.module';
import { NgFor, NgIf } from '@angular/common';
import { StructureService } from '../../../../_services/structure.service';
import { ArrayValidators } from '../../../../_validator/array.validator';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-structure-add',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, IconsModule, NgFor,NgIf],
  templateUrl: './structure-add.component.html',
  styleUrl: './structure-add.component.scss',
})
export class StructureAddComponent {
  // adresses: adresse [] = []
  
  hour: string[] = [
    '00',
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19',
    '20',
    '21',
    '22',
    '23',
  ];
  minute: string[] = [
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19',
    '20',
    '21',
    '22',
    '23',
    '24',
    '25',
    '26',
    '27',
    '28',
    '29',
    '30',
    '31',
    '32',
    '33',
    '34',
    '35',
    '36',
    '37',
    '38',
    '39',
    '40',
    '41',
    '42',
    '43',
    '44',
    '45',
    '46',
    '47',
    '48',
    '49',
    '50',
    '51',
    '52',
    '53',
    '54',
    '55',
    '56',
    '57',
    '58',
    '59',
  ];
  structureService = inject(StructureService);
  private router = inject(Router);

  assurances : string [] =[]
  activity : string [] =[]

  structureForm = new FormGroup({
    name: new FormControl('', Validators.required),
    domaine: new FormControl('', Validators.required),
    managerName: new FormControl('', Validators.required),
    managerTitle: new FormControl('', Validators.required),
    tel: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    // openingHours: new FormControl('', Validators.required),
    activity: new FormControl(''),
    type: new FormControl(''),
    assurance:new FormControl('', Validators.required),
    adresse: new FormArray([], ArrayValidators.minLength(1)),
    network: new FormArray([], ArrayValidators.minLength(1)),
    hours: new FormArray([], ArrayValidators.minLength(1)),
  });
  get adresses(): FormArray {
    return this.structureForm.get('adresse') as FormArray;
  }
  get networks(): FormArray {
    return this.structureForm.get('network') as FormArray;
  }

  get hours(): FormArray {
    return this.structureForm.get('hours') as FormArray;
  }
  onSubmit() {
    // console.log(this.structureForm.value);
    let assu = ''
    let act = ''
    for (let index = 0; index < this.assurances.length; index++) {
      const element = this.assurances[index];
      assu+=` ${element}`
      
    }
    for (let index = 0; index < this.activity.length; index++) {
      const element = this.activity[index];
      act+=` ${element}`
      
    }
    this.structureForm.controls.assurance.setValue(assu);
    this.structureService
      .addStructure(this.structureForm.value)
      .subscribe(() => {
        this.router.navigate(['dashboard']);
      });
  }
  addresseGroup = new FormGroup({
    nadress: new FormControl(''),
    eadress: new FormControl(''),
    isMain: new FormControl(''),
    lat: new FormControl(),
    lng: new FormControl(),
  });
  networkGroup = new FormGroup({
    name: new FormControl(''),
    link: new FormControl(''),
  });
  hoursGroup = new FormGroup({
    libelle: new FormControl(''),
    hStartH: new FormControl(''),
    hStartM: new FormControl(''),
    hEndH: new FormControl(''),
    hEndM: new FormControl(''),
  });
  addAdresse() {
    const cor = this.addresseGroup.value.eadress?.split(',');
    console.log(cor);
    if (cor) {
      this.addresseGroup.controls.lat.setValue(Number(cor[0].trim()));
      this.addresseGroup.controls.lng.setValue(Number(cor[1].trim()));
    }

    this.adresses.push(this.addresseGroup);
    this.addresseGroup = new FormGroup({
      nadress: new FormControl(''),
      eadress: new FormControl(''),
      isMain: new FormControl(''),
      lat: new FormControl(),
      lng: new FormControl(),
    });
    // console.log(this.structureForm.controls.adresse.value);

    // this.adresses=
  }

  addNetwork() {
    this.networks.push(this.networkGroup);
    this.networkGroup = new FormGroup({
      name: new FormControl(''),
      link: new FormControl(''),
    });
    // console.log(this.structureForm.controls.adresse.value);

    // this.adresses=
  }
  addHours(){
    const addingHours = new FormGroup({
      libelle: new FormControl(this.hoursGroup.value.libelle),
      hStart : new FormControl(this.hoursGroup.value.hStartH+'h '+this.hoursGroup.value.hStartM),
      hEnd : new FormControl(this.hoursGroup.value.hEndH+'h '+this.hoursGroup.value.hEndM),
    })
    console.log('coucou');
    this.hours.push(addingHours)
    // console.log(this.hoursGroup.value);
  }
  removeAdresse(index: number) {
    this.structureForm.controls.adresse.removeAt(index);
    // this.adresses=this.structureForm.controls.adresse.value
  }
  removeNetwork(index: number) {
    this.structureForm.controls.network.removeAt(index);
    // this.adresses=this.structureForm.controls.adresse.value
  }
  removeHours(index: number) {
    this.structureForm.controls.hours.removeAt(index);
    // this.adresses=this.structureForm.controls.adresse.value
  }
  removeAssurance(index: number) {
    console.log(0);
    
    this.assurances.splice(index, 1);
    // console.log(this.assurances);
    
    // this.adresses=this.structureForm.controls.adresse.value
  }

  removeActivity(index: number) {
    console.log(0);
    
    this.activity.splice(index, 1);
    // console.log(this.assurances);
    
    // this.adresses=this.structureForm.controls.adresse.value
  }
  onKeyUp(event: KeyboardEvent) {
    // Vérifier si la touche appuyée est un espace
    if (event.code === 'Space' &&  this.structureForm.value.assurance) {
      const trimmedWord = this.structureForm.value.assurance.trim(); // Retirer les espaces au début et à la fin
      if (trimmedWord.length > 0) {
        this.assurances.push(trimmedWord); // Ajouter le mot à la liste
        this.structureForm.controls.assurance.setValue(''); // Réinitialiser le champ de saisie
      }
    }
  }
  onKeyUpAc(event: KeyboardEvent) {
    // Vérifier si la touche appuyée est un espace
    if (event.code === 'Space' &&  this.structureForm.value.activity) {
      const trimmedWord = this.structureForm.value.activity.trim(); // Retirer les espaces au début et à la fin
      if (trimmedWord.length > 0) {
        this.activity.push(trimmedWord); // Ajouter le mot à la liste
        this.structureForm.controls.activity.setValue(''); // Réinitialiser le champ de saisie
      }
    }
  }
}
