import { Component, inject, OnInit } from '@angular/core';
import { IconsModule } from '../../../../_icons/icons.module';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DoctorService } from '../../../../_services/doctor.service';
import { Router, RouterModule } from '@angular/router';
import { RestContriesService } from '../../../../_services/rest-contries.service';

@Component({
  selector: 'app-doctor-add',
  standalone: true,
  imports: [IconsModule, ReactiveFormsModule,RouterModule],
  templateUrl: './doctor-add.component.html',
  styleUrl: './doctor-add.component.scss',
})
export class DoctorAddComponent implements OnInit{
  ngOnInit() {
    this.countryService.getAfricanCountries().subscribe((res)=>{
      console.log(res);
      this.countries=res
      
    })
  }

  countries: any[] = [];

  private countryService = inject(RestContriesService)
  private doctorService = inject(DoctorService)
  private router = inject(Router);
  activity: string[] = [];


  doctorForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    speciality: new FormControl('', Validators.required),
    tel: new FormControl('', Validators.required),
    secteur: new FormControl('pub', Validators.required),
    activity: new FormControl(''),
    country: new FormControl('',Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
  });
  onSubmit() {
    let act = '';
    for (let index = 0; index < this.activity.length; index++) {
      const element = this.activity[index];
      act += ` ${element}`;
    }
    this.doctorForm.controls.activity.setValue(act.trim());

    console.log(this.doctorForm.value);
    this.doctorService.addDoctor(this.doctorForm.value).subscribe(()=>{
      this.router.navigate(['dashboard/doctors']);

    })
  }

  activityGroup = new FormGroup({
    libelle: new FormControl(''),
  });




  removeActivity(index: number) {
    console.log(0);

    this.activity.splice(index, 1);
    // console.log(this.assurances);

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
