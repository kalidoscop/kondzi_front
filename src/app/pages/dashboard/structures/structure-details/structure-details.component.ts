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
import { NgFor } from '@angular/common';
import { Adresse } from '../../../../_model/adresse';
import { Network } from '../../../../_model/network';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-structure-details',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, IconsModule, NgFor],
  templateUrl: './structure-details.component.html',
  styleUrl: './structure-details.component.scss',
})
export class StructureDetailsComponent implements OnInit {
  structureService = inject(StructureService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

  structureId: string | null = this.activatedRoute.snapshot.paramMap.get('id');
  adresse: Adresse[] = [];
  network: Network[] = [];
  structureForm = new FormGroup({
    name: new FormControl('', Validators.required),
    domaine: new FormControl('', Validators.required),
    managerName: new FormControl('', Validators.required),
    managerTitle: new FormControl('', Validators.required),
    tel: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    openingHours: new FormControl('', Validators.required),
    activity: new FormControl('', Validators.required),
    type: new FormControl('', Validators.required),
    adresse: new FormArray([], ArrayValidators.minLength(1)),
    network: new FormArray([], ArrayValidators.minLength(1)),
  });
  ngOnInit(): void {
    this.loadStructureInfo()
    // throw new Error('Method not implemented.');
  }

  get adresses(): FormArray {
    return this.structureForm.get('adresse') as FormArray;
  }
  get networks(): FormArray {
    return this.structureForm.get('network') as FormArray;
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
          openingHours: new FormControl(
            `${res.opening_hours}`,
            Validators.required
          ),
          activity: new FormControl(`${res.activity}`, Validators.required),
          type: new FormControl(`${res.type}`, Validators.required),
          adresse: new FormArray([], ArrayValidators.minLength(0)),
          network: new FormArray([], ArrayValidators.minLength(0)),
        });
        this.adresse = res.adresse;
        this.network = res.network;
      });
    }
  }

  onSubmit() {
    if (environment.isDevEnv) console.log(this.structureForm.value);
    if (this.structureId) {
      this.structureService
        .updateStructure(this.structureForm.value, this.structureId)
        .subscribe((res) => {
          if (environment.isDevEnv) console.log(res);
          this.loadStructureInfo()
        });
    }
  }
  addresseGroup = new FormGroup({
    nadress: new FormControl(''),
    eadress: new FormControl(''),
    isMain: new FormControl(''),
  });
  networkGroup = new FormGroup({
    name: new FormControl(''),
    link: new FormControl(''),
  });
  addAdresse() {
    this.adresses.push(this.addresseGroup);
    this.addresseGroup = new FormGroup({
      nadress: new FormControl(''),
      eadress: new FormControl(''),
      isMain: new FormControl(''),
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
  removeAdresse(index: number) {
    this.structureForm.controls.adresse.removeAt(index);
    // this.adresses=this.structureForm.controls.adresse.value
  }
  removeNetwork(index: number) {
    this.structureForm.controls.network.removeAt(index);
    // this.adresses=this.structureForm.controls.adresse.value
  }
}
