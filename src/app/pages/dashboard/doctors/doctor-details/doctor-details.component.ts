import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { DoctorService } from '../../../../_services/doctor.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IconsModule } from '../../../../_icons/icons.module';

@Component({
  selector: 'app-doctor-details',
  standalone: true,
  imports: [ReactiveFormsModule, IconsModule, RouterModule],
  templateUrl: './doctor-details.component.html',
  styleUrl: './doctor-details.component.scss',
})
export class DoctorDetailsComponent implements OnInit {
  doctorService = inject(DoctorService);
  private activatedRoute = inject(ActivatedRoute);
  activity: string[] = [];

  doctorId: string | null = this.activatedRoute.snapshot.paramMap.get('id');

  doctorForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    speciality: new FormControl('', Validators.required),
    tel: new FormControl('', Validators.required),
    secteur: new FormControl('pub', Validators.required),
    activity: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  ngOnInit(): void {
    this.loadDoctorInfo();
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
          tel: new FormControl(`${res.tel}`, Validators.required),
          secteur: new FormControl(`${res.secteur}`, Validators.required),
          activity: new FormControl(' '),

          email: new FormControl(`${res.email}`, [
            Validators.required,
            Validators.email,
          ]),
        });
        this.activity = res.activity.split(' ');

      });
    }
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
