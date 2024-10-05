import { Component, inject } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IconsModule } from '../../../../_icons/icons.module';
import { NgFor } from '@angular/common';
import { StructureService } from '../../../../_services/structure.service';
import { ArrayValidators } from '../../../../_validator/array.validator';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-structure-add',
  standalone: true,
  imports: [ReactiveFormsModule,RouterModule, IconsModule, NgFor],
  templateUrl: './structure-add.component.html',
  styleUrl: './structure-add.component.scss',
})
export class StructureAddComponent {
  // adresses: adresse [] = []
  // adresses: any = []
  structureService = inject(StructureService);
  private router = inject(Router);

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
  get adresses(): FormArray {
    return this.structureForm.get('adresse') as FormArray;
  }
  get networks(): FormArray {
    return this.structureForm.get('network') as FormArray;
  }
  onSubmit() {
    console.log(this.structureForm.value);
    this.structureService
      .addStructure(this.structureForm.value)
      .subscribe((res) => {
        this.router.navigate(['dashboard']);
      });
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
  removeAdresse(index: number) {
    this.structureForm.controls.adresse.removeAt(index);
    // this.adresses=this.structureForm.controls.adresse.value
  }
  removeNetwork(index: number) {
    this.structureForm.controls.network.removeAt(index);
    // this.adresses=this.structureForm.controls.adresse.value
  }
}
