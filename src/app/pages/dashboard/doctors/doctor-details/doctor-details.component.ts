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
  imports: [ReactiveFormsModule, IconsModule,RouterModule],
  templateUrl: './doctor-details.component.html',
  styleUrl: './doctor-details.component.scss',
})
export class DoctorDetailsComponent implements OnInit {
  doctorService = inject(DoctorService);
  private activatedRoute = inject(ActivatedRoute);

  doctorId: string | null = this.activatedRoute.snapshot.paramMap.get('id');

  doctorForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    speciality: new FormControl('', Validators.required),
    tel: new FormControl('', Validators.required),
    secteur: new FormControl('pub', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  ngOnInit(): void {
    this.loadDoctorInfo();
  }

  onSubmit() {
    if (this.doctorId) {
      this.doctorService
        .updateDoctor(this.doctorForm.value, this.doctorId)
        .subscribe(() => {
          this.loadDoctorInfo()
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
          email: new FormControl(`${res.email}`, [
            Validators.required,
            Validators.email,
          ]),
        });
      });
    }
  }
}
