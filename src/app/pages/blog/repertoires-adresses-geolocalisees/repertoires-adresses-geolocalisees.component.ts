import { Component, inject, OnInit } from '@angular/core';
import { ScrollService } from '../../../_services/scroll.service';
import { PageService } from '../../../_services/page.service';
import { FooterComponent } from '../../component/footer/footer.component';
import { BlogComponent } from "../../component/blog/blog.component";

@Component({
  selector: 'app-repertoires-adresses-geolocalisees',
  standalone: true,
  imports: [FooterComponent, BlogComponent],
  templateUrl: './repertoires-adresses-geolocalisees.component.html',
  styleUrl: './repertoires-adresses-geolocalisees.component.scss'
})
export class RepertoiresAdressesGeolocaliseesComponent implements OnInit {
  content:string = ''
  scrollService = inject(ScrollService)
  pageService = inject(PageService)
  ngOnInit(): void {
    this.scrollService.setNavbarOpaque(true);
    this.pageService.getPage("repertoires-adresses-geolocalisees").subscribe((res)=>{
      this.content=res.page
    })
  }
}
