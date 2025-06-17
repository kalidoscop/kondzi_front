import { Component, inject, OnInit } from '@angular/core';
import { Structure } from '../../../../_model/structure';
import { StructureService } from '../../../../_services/structure.service';
import { IconsModule } from '../../../../_icons/icons.module';
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
  selector: 'app-structure-list',
  standalone: true,
  imports: [IconsModule, RouterModule, NgClass, ReactiveFormsModule],
  templateUrl: './structure-list.component.html',
  styleUrl: './structure-list.component.scss',
})
export class StructureListComponent implements OnInit {
  private structureService = inject(StructureService);
  search = new FormGroup({
    type: new FormControl('all'),
    countrie: new FormControl('all'),
    word: new FormControl('', Validators.required),
  });
  ngOnInit(): void {
    this.loadStructure();
  }
  structures: Structure[] = [];
  meta: MetaData | undefined;

  deletedId: string | null = null;

  loadStructure(page?: string) {
      if (this.search.valid) {
        this.structureService
          .search(this.search.value, page)
          .subscribe((res) => {
            this.structures = res.data;
            this.meta = res.meta;
          });
      } else {
      // console.log(page);
      
      this.structureService.getStructures(page).subscribe((res) => {
        this.structures = res.data;
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

    this.structureService.deleteStructure(this.deletedId).subscribe(() => {
      this.loadStructure();
      this.closeDeleteModal();
    });
  }

  closeDeleteModal() {
    this.deletedId = null;
  }

  onSubmitSearch() {
    this.loadStructure();
  }
  onSubmitSearch2() {
    this.loadStructure();
  }
  next(page: string) {
    //console.log(this.activatedRoute.url);

    this.loadStructure(page);
  }
}
