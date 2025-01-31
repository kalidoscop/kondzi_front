import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { DoctorService } from '../../../../_services/doctor.service';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IconsModule } from '../../../../_icons/icons.module';
import { RestContriesService } from '../../../../_services/rest-contries.service';
import { ArrayValidators } from '../../../../_validator/array.validator';
import libphonenumber from 'google-libphonenumber';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-doctor-details',
  standalone: true,
  imports: [ReactiveFormsModule, IconsModule, RouterModule,NgFor],
  templateUrl: './doctor-details.component.html',
  styleUrl: './doctor-details.component.scss',
})
export class DoctorDetailsComponent implements OnInit {
  doctorService = inject(DoctorService);
  private activatedRoute = inject(ActivatedRoute);
  private countryService = inject(RestContriesService)
  private phoneUtil = libphonenumber.PhoneNumberUtil.getInstance();


  activity: string[] = [];
  countries: any[] = [];

  doctorId: string | null = this.activatedRoute.snapshot.paramMap.get('id');
  
  doctorForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    speciality: new FormControl('', Validators.required),
    tel: new FormArray([], ArrayValidators.minLength(1)),
    country: new FormControl('',Validators.required),
    secteur: new FormControl('pub', Validators.required),
    activity: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
  });
  get tels(): FormArray {
    return this.doctorForm.get('tel') as FormArray;
  }
  ngOnInit(): void {
    this.countryService.getAfricanCountries().subscribe((res)=>{
      console.log(res);
      this.countries=res
      this.loadDoctorInfo();
      
    })
  }

  onSubmit() {
    let act = '';
    for (let index = 0; index < this.activity.length; index++) {
      const element = this.activity[index];
      act += ` ${element}`;
    }
    if (this.doctorId) {
      this.doctorForm.controls.activity.setValue(act.trim());
      this.doctorService
        .updateDoctor(this.doctorForm.value, this.doctorId)
        .subscribe(() => {
          this.loadDoctorInfo();
        });
    }
  }

  loadDoctorInfo() {
    if (this.doctorId) {
      this.doctorService.getDotor(this.doctorId).subscribe((res) => {
        this.doctorForm = new FormGroup({
          firstName: new FormControl(`${res.first_name}`, Validators.required),
          lastName: new FormControl(`${res.last_name}`, Validators.required),
          speciality: new FormControl(`${res.speciality}`, Validators.required),
          tel: new FormArray([], ArrayValidators.minLength(0)),
          country: new FormControl(`${res.country}`, Validators.required),
          secteur: new FormControl(`${res.secteur}`, Validators.required),
          activity: new FormControl(' '),

          email: new FormControl(`${res.email}`, [
            Validators.required,
            Validators.email,
          ]),
        });
        this.activity = res.activity.split(' ');
        for (let i = 0; i < res.tel.length; i++) {
          const tel = res.tel[i];
          const addingTel = new FormGroup({
            flag: new FormControl(tel.flag),
            prefix: new FormControl(tel.prefix),
            number: new FormControl(tel.number),
          });
          this.tels.push(addingTel);
          
        }
      });
    }
  }

  activityGroup = new FormGroup({
    libelle: new FormControl(''),
  });
  numberGroup = new FormGroup({
    cca2: new FormControl('', Validators.required),
    number: new FormControl('', Validators.required),
  });

  addNumber() {
    console.log(this.numberGroup.value);
    const cca2 = this.numberGroup.value.cca2?.split('|');
    if (cca2 && this.numberGroup.value.number) {
      const number = this.phoneUtil.parseAndKeepRawInput(
        String(this.numberGroup.value.number),
        cca2[0]
      );
      console.log(this.phoneUtil.isValidNumberForRegion(number, cca2[0]));
      // if (this.phoneUtil.isValidNumberForRegion(number, cca2[0])) {
      //   const addingTel = new FormGroup({
      //     flag: new FormControl(cca2[1]),
      //     prefix: new FormControl(cca2[2]),
      //     number: new FormControl(String(this.numberGroup.value.number)),
      //   });
      //   this.tels.push(addingTel);
      // }
      const addingTel = new FormGroup({
        flag: new FormControl(cca2[1]),
        prefix: new FormControl(cca2[2]),
        number: new FormControl(String(this.numberGroup.value.number)),
      });
      this.tels.push(addingTel);
    }
  }
  removeActivity(index: number) {
    console.log(0);

    this.activity.splice(index, 1);
    // console.log(this.assurances);

    // this.adresses=this.structureForm.controls.adresse.value
  }
  removeNumber(index: number) {
    this.doctorForm.controls.tel.removeAt(index);
    // this.adresses=this.structureForm.controls.adresse.value
  }
  onKeyUpAc(event: KeyboardEvent) {
    // Vérifier si la touche appuyée est un espace
    if (event.code === 'Space' && this.activityGroup.value.libelle) {
      const trimmedWord = this.activityGroup.value.libelle.trim(); // Retirer les espaces au début et à la fin
      if (trimmedWord.length > 0) {
        this.activity.push(trimmedWord); // Ajouter le mot à la liste
        this.activityGroup.controls.libelle.setValue(''); // Réinitialiser le champ de saisie
      }
    }
  }
}
