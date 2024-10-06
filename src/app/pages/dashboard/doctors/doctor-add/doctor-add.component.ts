import { Component, inject } from '@angular/core';
import { IconsModule } from '../../../../_icons/icons.module';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DoctorService } from '../../../../_services/doctor.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-doctor-add',
  standalone: true,
  imports: [IconsModule, ReactiveFormsModule,RouterModule],
  templateUrl: './doctor-add.component.html',
  styleUrl: './doctor-add.component.scss',
})
export class DoctorAddComponent {

  doctorService = inject(DoctorService)
  private router = inject(Router);

  doctorForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    speciality: new FormControl('', Validators.required),
    tel: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
  });
  onSubmit() {
    console.log(this.doctorForm.value);
    this.doctorService.addDoctor(this.doctorForm.value).subscribe(()=>{
      this.router.navigate(['dashboard/doctors']);

    })
  }
}
