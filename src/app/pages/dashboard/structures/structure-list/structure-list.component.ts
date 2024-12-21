import { Component, inject, OnInit } from '@angular/core';
import { Structure } from '../../../../_model/structure';
import { StructureService } from '../../../../_services/structure.service';
import { IconsModule } from '../../../../_icons/icons.module';
import { RouterModule } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-structure-list',
  standalone: true,
  imports: [IconsModule, RouterModule,NgClass],
  templateUrl: './structure-list.component.html',
  styleUrl: './structure-list.component.scss',
})
export class StructureListComponent implements OnInit {
  private structureService = inject(StructureService);

  ngOnInit(): void {
    this.loadStructure()
  }
  structure: Structure[] = [];
  deletedId: string | null = null;

  loadStructure(){
    this.structureService.getStructures().subscribe((res) => {
      this.structure = res;
    });
  }

  openDeleteModal(id: string) {
    this.deletedId=id
  }
  deleteStructure(id: string) {
    this.deletedId=id
    // console.log(this.deletedId);

    this.structureService.deleteStructure(this.deletedId).subscribe(()=>{
      this.loadStructure()
      this.closeDeleteModal()
    })
    
  }

  closeDeleteModal() {
    this.deletedId=null
  }
}
