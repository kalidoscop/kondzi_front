import { Component, inject, OnInit } from '@angular/core';
import { IconsModule } from '../../../../_icons/icons.module';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Doctor } from '../../../../_model/doctor';
import { StructureService } from '../../../../_services/structure.service';
import { DoctorService } from '../../../../_services/doctor.service';
import { MetaData } from '../../../../_model/meta';

@Component({
  selector: 'app-adresse-doctor',
  standalone: true,
  imports: [IconsModule, RouterModule],
  templateUrl: './adresse-doctor.component.html',
  styleUrl: './adresse-doctor.component.scss',
})
export class AdresseDoctorComponent implements OnInit {
  private structureService = inject(StructureService);
  private doctorService = inject(DoctorService);

  private activatedRoute = inject(ActivatedRoute);
  adresseDoctors: Doctor[] = [];
  doctors: Doctor[] = [];
    meta: MetaData | undefined;
  
  adresseId: string | null = this.activatedRoute.snapshot.paramMap.get('id');
  ngOnInit(): void {
    this.loadAdresseDoctor()
    if (!this.adresseDoctors.length) {
      this.loadDoctor()
    }
  }

  loadAdresseDoctor(){
    if (this.adresseId) {
      this.structureService
        .getAdresseDoctor(this.adresseId)
        .subscribe((res) => {
          this.adresseDoctors = res;
          if (!this.adresseDoctors.length) {
            this.loadDoctor()
          }
        });
    }
  }

  loadDoctor(page?: string) {
    this.doctorService.getDotors(page).subscribe((res) => {
      this.doctors = res.data;
      this.meta = res.meta
    });
  }

   next(page: string) {
    //console.log(this.activatedRoute.url);

    this.loadDoctor(page);
  }

  attachDoctor(id: string, doctorId: string) {
    this.structureService.attachAdresseDoctor(id, doctorId).subscribe(() => {
      this.doctors=[]
      this.loadAdresseDoctor()
    });
  }
   detachDoctor(id: string, doctorId: string) {
    this.structureService.detachAdresseDoctor(id, doctorId).subscribe(async () => {
      this.loadAdresseDoctor()
    });
  }
}
