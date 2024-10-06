import { Component } from '@angular/core';
import { IconsModule } from '../../../../_icons/icons.module';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-adresse-doctor',
  standalone: true,
  imports: [IconsModule,RouterModule],
  templateUrl: './adresse-doctor.component.html',
  styleUrl: './adresse-doctor.component.scss'
})
export class AdresseDoctorComponent {

}
