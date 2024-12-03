import { Component, inject, OnInit } from '@angular/core';
import { ScrollService } from '../../_services/scroll.service';
import { PageService } from '../../_services/page.service';
import { FooterComponent } from '../component/footer/footer.component';

@Component({
  selector: 'app-media-sante',
  standalone: true,
  imports: [FooterComponent],
  templateUrl: './media-sante.component.html',
  styleUrl: './media-sante.component.scss'
})
export class MediaSanteComponent implements OnInit{
  content:string = ''
  scrollService = inject(ScrollService)
  pageService = inject(PageService)
  ngOnInit(): void {
    this.scrollService.setNavbarOpaque(true);
    this.pageService.getPage("media-sante").subscribe((res)=>{
      this.content=res.page
    })
  }
}
