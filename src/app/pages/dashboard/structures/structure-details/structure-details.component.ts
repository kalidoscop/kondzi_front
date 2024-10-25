import { Component, inject, OnInit } from '@angular/core';
import { StructureService } from '../../../../_services/structure.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ArrayValidators } from '../../../../_validator/array.validator';
import { IconsModule } from '../../../../_icons/icons.module';
import { NgFor, NgIf } from '@angular/common';
import { Adresse } from '../../../../_model/adresse';
import { Network } from '../../../../_model/network';
import { environment } from '../../../../../environments/environment';
import { Hour } from '../../../../_model/hour';

@Component({
  selector: 'app-structure-details',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, IconsModule, NgIf, NgFor],
  templateUrl: './structure-details.component.html',
  styleUrl: './structure-details.component.scss',
})
export class StructureDetailsComponent implements OnInit {
  hourSlecte: string[] = [
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

  assurances: string[] = [];
  activity: string[] = [];

  structureService = inject(StructureService);
  // private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

  structureId: string | null = this.activatedRoute.snapshot.paramMap.get('id');
  adresse: Adresse[] = [];
  network: Network[] = [];
  hour: Hour[] = [];
  structureForm = new FormGroup({
    name: new FormControl('', Validators.required),
    domaine: new FormControl('', Validators.required),
    managerName: new FormControl('', Validators.required),
    managerTitle: new FormControl('', Validators.required),
    tel: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    activity: new FormControl(''),
    type: new FormControl(''),
    assurance: new FormControl('', Validators.required),
    adresse: new FormArray([], ArrayValidators.minLength(1)),
    network: new FormArray([], ArrayValidators.minLength(1)),
    hours: new FormArray([], ArrayValidators.minLength(1)),
  });
  ngOnInit(): void {
    this.loadStructureInfo();
    // throw new Error('Method not implemented.');
  }

  get adresses(): FormArray {
    return this.structureForm.get('adresse') as FormArray;
  }
  get networks(): FormArray {
    return this.structureForm.get('network') as FormArray;
  }
  get hours(): FormArray {
    return this.structureForm.get('hours') as FormArray;
  }

  loadStructureInfo() {
    if (this.structureId) {
      this.structureService.getStructure(this.structureId).subscribe((res) => {
        if (environment.isDevEnv) console.log(res);
        this.structureForm = new FormGroup({
          name: new FormControl(`${res.name}`, Validators.required),
          domaine: new FormControl(`${res.domaine}`, Validators.required),
          managerName: new FormControl(
            `${res.manager_name}`,
            Validators.required
          ),
          managerTitle: new FormControl(
            `${res.manager_title}`,
            Validators.required
          ),
          tel: new FormControl(`${res.tel}`, Validators.required),
          email: new FormControl(`${res.email}`, [
            Validators.required,
            Validators.email,
          ]),
          assurance: new FormControl(``),

          activity: new FormControl(``),
          type: new FormControl(`${res.type}`, Validators.required),
          adresse: new FormArray([], ArrayValidators.minLength(0)),
          network: new FormArray([], ArrayValidators.minLength(0)),
          hours: new FormArray([], ArrayValidators.minLength(0)),
        });
        this.adresse = res.adresse;
        this.network = res.network;
        this.assurances = res.assurance.split(' ');
        this.activity = res.activity.split(' ');
        this.hour = res.hours;
      });
    }
  }

  onSubmit() {
    if (environment.isDevEnv) console.log(this.structureForm.value);
    console.log(this.structureForm.value);
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
    this.structureForm.controls.assurance.setValue(assu.trim());
    this.structureForm.controls.activity.setValue(act.trim());
    if (this.structureId) {
      this.structureService
        .updateStructure(this.structureForm.value, this.structureId)
        .subscribe((res) => {
          if (environment.isDevEnv) console.log(res);
          this.loadStructureInfo();
        });
    }
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
  activityGroup = new FormGroup({
    libelle: new FormControl(''),
  });
  assurenceGroup = new FormGroup({
    libelle: new FormControl(''),
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
    //if (environment.isDevEnv) console.log(this.structureForm.controls.adresse.value);

    // this.adresses=
  }

  addNetwork() {
    this.networks.push(this.networkGroup);
    this.networkGroup = new FormGroup({
      name: new FormControl(''),
      link: new FormControl(''),
    });
    // if (environment.isDevEnv) console.log(this.structureForm.controls.adresse.value);

    // this.adresses=
  }

  addHours() {
    const addingHours = new FormGroup({
      libelle: new FormControl(this.hoursGroup.value.libelle),
      hStart: new FormControl(
        this.hoursGroup.value.hStartH + 'h ' + this.hoursGroup.value.hStartM
      ),
      hEnd: new FormControl(
        this.hoursGroup.value.hEndH + 'h ' + this.hoursGroup.value.hEndM
      ),
    });
    console.log('coucou');
    this.hours.push(addingHours);
    // console.log(this.hoursGroup.value);
  }

  reloadOldAdresse() {
    if (this.structureId) {
      this.structureService.getStructure(this.structureId).subscribe((res) => {
        this.adresse = res.adresse;
      });
    }
  }
  reloadOldNetwork() {
    if (this.structureId) {
      this.structureService.getStructure(this.structureId).subscribe((res) => {
        this.network = res.network;
      });
    }
  }
  reloadOldHour() {
    if (this.structureId) {
      this.structureService.getStructure(this.structureId).subscribe((res) => {
        this.hour = res.hours;
      });
    }
  }
  removeOldAdresse(index: string) {
    this.structureService.deleteStructurAdresse(index).subscribe(() => {
      this.reloadOldAdresse();
    });
  }
  removeOldNetwork(index: string) {
    this.structureService.deleteStructurNetwork(index).subscribe(() => {
      this.reloadOldNetwork();
    });
  }
  removeOldHours(index: string) {
    this.structureService.deleteStructurHours(index).subscribe(() => {
      this.reloadOldHour();
    });
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
    if (event.code === 'Space' &&  this.assurenceGroup.value.libelle) {
      const trimmedWord = this.assurenceGroup.value.libelle.trim(); // Retirer les espaces au début et à la fin
      if (trimmedWord.length > 0) {
        this.assurances.push(trimmedWord); // Ajouter le mot à la liste
        this.assurenceGroup.controls.libelle.setValue(' '); // Réinitialiser le champ de saisie
      }
    }
  }
  onKeyUpAc(event: KeyboardEvent) {
    // Vérifier si la touche appuyée est un espace
    if (event.code === 'Space' &&  this.activityGroup.value.libelle) {
      
      const trimmedWord = this.activityGroup.value.libelle.trim(); // Retirer les espaces au début et à la fin
      if (trimmedWord.length > 0) {
        this.activity.push(trimmedWord); // Ajouter le mot à la liste
        this.activityGroup.controls.libelle.setValue(''); // Réinitialiser le champ de saisie
      }
    }
  }
}
