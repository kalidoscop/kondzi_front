import { Component, inject, OnInit } from '@angular/core';
import { ScrollService } from '../../_services/scroll.service';
import { PageService } from '../../_services/page.service';
import { FooterComponent } from '../component/footer/footer.component';

@Component({
  selector: 'app-bien-etre-infos-utiles',
  standalone: true,
  imports: [FooterComponent],
  templateUrl: './bien-etre-infos-utiles.component.html',
  styleUrl: './bien-etre-infos-utiles.component.scss'
})
export class BienEtreInfosUtilesComponent implements OnInit{
  content:string = ''
  scrollService = inject(ScrollService)
  pageService = inject(PageService)
  ngOnInit(): void {
    this.scrollService.setNavbarOpaque(true);
    this.pageService.getPage("bien-etre-infos-utiles").subscribe((res)=>{
      this.content=res.page
    })
  }
}
 