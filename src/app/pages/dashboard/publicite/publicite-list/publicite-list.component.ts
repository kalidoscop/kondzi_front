import { Component, inject, OnInit } from '@angular/core';
import { Publicite } from '../../../../_model/publicite';
import { PubliciteService } from '../../../../_services/publicite.service';
import { RouterModule } from '@angular/router';
import { IconsModule } from '../../../../_icons/icons.module';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-publicite-list',
  standalone: true,
  imports: [RouterModule,IconsModule,NgClass],
  templateUrl: './publicite-list.component.html',
  styleUrl: './publicite-list.component.scss'
})
export class PubliciteListComponent implements OnInit {
 publiciteService = inject(PubliciteService)
  pub : Publicite[]=[]
  deletedId: string | null = null;



  ngOnInit(): void {
    this.loadPub()
  }
  loadPub(){
    this.publiciteService.getPublicites().subscribe((res)=>{
      this.pub=res

    })
  }
  openDeleteModal(id: string) {
    this.deletedId=id
  }
  deleteStructure(id: string) {
    this.deletedId=id
    // console.log(this.deletedId);

    this.publiciteService.deletePublicite(this.deletedId).subscribe(()=>{
      this.loadPub()
      this.closeDeleteModal()
    })
    
  }

  closeDeleteModal() {
    this.deletedId=null
  }
}
