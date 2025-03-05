import { NgClass } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { IconsModule } from '../../../../_icons/icons.module';
import { RouterModule } from '@angular/router';
import { UadresseService } from '../../../../_services/uadresse.service';
import { UtilAdresse } from '../../../../_model/uadresse';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-uadresse-list',
  standalone: true,
  imports: [RouterModule, IconsModule, NgClass, ReactiveFormsModule],
  templateUrl: './uadresse-list.component.html',
  styleUrl: './uadresse-list.component.scss',
})
export class UadresseListComponent implements OnInit {
  private uadresseService = inject(UadresseService);

  uadresseForm = new FormGroup({
    title: new FormControl('', Validators.required),
    link: new FormControl('', Validators.required),
  });

  uadresses: UtilAdresse[] = [];

  deletedId: string | null = null;

  addModal: boolean = false;

  ngOnInit(): void {
    this.loadUadresse();
  }

  loadUadresse() {
    this.uadresseService.getUtilAdresses().subscribe((res) => {
      this.uadresses = res;
    });
  }
  openDeleteModal(id: string) {
    this.deletedId = id;
  }
  openAddModal() {
    this.addModal = true;
  }
  deleteUadresse(id: string) {
    this.deletedId = id;
    // console.log(this.deletedId);

    this.uadresseService.deleteUtilAdresse(this.deletedId).subscribe(() => {
      this.loadUadresse();
      this.closeDeleteModal();
    });
  }

  closeDeleteModal() {
    this.deletedId = null;
  }
  closeAddModal() {
    this.addModal = false;

    this.uadresseForm.controls.title.setValue('');
    this.uadresseForm.controls.link.setValue('');
  }

  addUadresse() {
    // console.log(this.uadresseForm.value);
    this.uadresseService
      .addUtilAdresse(this.uadresseForm.value)
      .subscribe((res) => {
        this.loadUadresse();
        this.closeAddModal();
      });
  }
}
