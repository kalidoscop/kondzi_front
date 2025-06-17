import { Component, inject, OnInit } from '@angular/core';
import { IconsModule } from '../../../../_icons/icons.module';
import { Doctor } from '../../../../_model/doctor';
import { DoctorService } from '../../../../_services/doctor.service';
import { RouterModule } from '@angular/router';
import { NgClass } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MetaData } from '../../../../_model/meta';

@Component({
  selector: 'app-doctor-list',
  standalone: true,
  imports: [IconsModule, RouterModule, NgClass, ReactiveFormsModule],
  templateUrl: './doctor-list.component.html',
  styleUrl: './doctor-list.component.scss',
})
export class DoctorListComponent implements OnInit {
  doctorService = inject(DoctorService);
  doctors: Doctor[] = [];
  meta: MetaData | undefined;

  deletedId: string | null = null;

  search = new FormGroup({
    type: new FormControl('doc'),
    countrie: new FormControl('all'),
    word: new FormControl('', Validators.required),
  });

  ngOnInit(): void {
    this.loadDoctors();
  }
  loadDoctors(page?: string) {
    if (this.search.valid) {
      this.doctorService.search(this.search.value, page).subscribe((res) => {
        this.doctors = res.data;
        this.meta = res.meta;
      });
    } else {
      this.doctorService.getDotors(page).subscribe((res) => {
        this.doctors = res.data;
        this.meta = res.meta;
      });
    }
  }
  openDeleteModal(id: string) {
    this.deletedId = id;
  }
  deleteStructure(id: string) {
    this.deletedId = id;
    // console.log(this.deletedId);

    this.doctorService.deleteDotor(this.deletedId).subscribe(() => {
      this.loadDoctors();
      this.closeDeleteModal();
    });
  }

  closeDeleteModal() {
    this.deletedId = null;
  }

  onSubmitSearch() {
    this.loadDoctors();
  }
  next(page: string) {
    //console.log(this.activatedRoute.url);

    this.loadDoctors(page);
  }
}
