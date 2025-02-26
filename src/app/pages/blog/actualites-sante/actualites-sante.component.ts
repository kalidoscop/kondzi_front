import { Component, inject, OnInit } from '@angular/core';
import { ScrollService } from '../../../_services/scroll.service';
import { PageService } from '../../../_services/page.service';
import { FooterComponent } from '../../component/footer/footer.component';
import { BlogComponent } from "../../component/blog/blog.component";

@Component({
  selector: 'app-actualites-sante',
  standalone: true,
  imports: [FooterComponent, BlogComponent],
  templateUrl: './actualites-sante.component.html',
  styleUrl: './actualites-sante.component.scss'
})
export class ActualitesSanteComponent implements OnInit{
  content:string = ''
  scrollService = inject(ScrollService)
  pageService = inject(PageService)
  ngOnInit(): void {
    this.scrollService.setNavbarOpaque(true);
    this.pageService.getPage("actualites-sante").subscribe((res)=>{
      this.content=res.page
    })
  }
}
