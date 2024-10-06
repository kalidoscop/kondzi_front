import { Component, inject, OnInit } from '@angular/core';
import { IconsModule } from '../../../../_icons/icons.module';
import { Doctor } from '../../../../_model/doctor';
import { DoctorService } from '../../../../_services/doctor.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-doctor-list',
  standalone: true,
  imports: [IconsModule,RouterModule],
  templateUrl: './doctor-list.component.html',
  styleUrl: './doctor-list.component.scss'
})
export class DoctorListComponent implements OnInit{

  doctorService = inject(DoctorService)
  doctors : Doctor[]=[]


  ngOnInit(): void {
    this.loadDoctors()
  }
  loadDoctors(){
    this.doctorService.getDotors().subscribe((res)=>{
      this.doctors=res

    })
  }

}
