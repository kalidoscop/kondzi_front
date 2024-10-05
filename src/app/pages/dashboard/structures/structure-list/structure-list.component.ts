import { Component, inject, OnInit } from '@angular/core';
import { Structure } from '../../../../_model/structure';
import { StructureService } from '../../../../_services/structure.service';
import { IconsModule } from '../../../../_icons/icons.module';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-structure-list',
  standalone: true,
  imports: [IconsModule,RouterModule],
  templateUrl: './structure-list.component.html',
  styleUrl: './structure-list.component.scss'
})
export class StructureListComponent implements OnInit{

  private structureService= inject(StructureService)

  ngOnInit(): void {
    this.structureService.getStructure().subscribe((res)=>{
      
      this.structure = res
    })
  }
  structure : Structure[] =[]
}
