import { Component, inject, OnInit } from '@angular/core';
import { IconsModule } from '../../../../_icons/icons.module';
import { Doctor } from '../../../../_model/doctor';
import { DoctorService } from '../../../../_services/doctor.service';
import { RouterModule } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-doctor-list',
  standalone: true,
  imports: [IconsModule,RouterModule,NgClass],
  templateUrl: './doctor-list.component.html',
  styleUrl: './doctor-list.component.scss'
})
export class DoctorListComponent implements OnInit{

  doctorService = inject(DoctorService)
  doctors : Doctor[]=[]
  deletedId: string | null = null;



  ngOnInit(): void {
    this.loadDoctors()
  }
  loadDoctors(){
    this.doctorService.getDotors().subscribe((res)=>{
      this.doctors=res

    })
  }
  openDeleteModal(id: string) {
    this.deletedId=id
  }
  deleteStructure(id: string) {
    this.deletedId=id
    // console.log(this.deletedId);

    this.doctorService.deleteDotor(this.deletedId).subscribe(()=>{
      this.loadDoctors()
      this.closeDeleteModal()
    })
    
  }

  closeDeleteModal() {
    this.deletedId=null
  }
}
