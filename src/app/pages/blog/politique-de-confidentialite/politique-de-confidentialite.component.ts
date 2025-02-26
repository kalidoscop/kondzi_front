import { Component, inject, OnInit } from '@angular/core';
import { ScrollService } from '../../../_services/scroll.service';
import { PageService } from '../../../_services/page.service';
import { FooterComponent } from '../../component/footer/footer.component';
import { BlogComponent } from "../../component/blog/blog.component";

@Component({
  selector: 'app-politique-de-confidentialite',
  standalone: true,
  imports: [FooterComponent, BlogComponent],
  templateUrl: './politique-de-confidentialite.component.html',
  styleUrl: './politique-de-confidentialite.component.scss'
})
export class PolitiqueDeConfidentialiteComponent implements OnInit{
  content:string = ''
  scrollService = inject(ScrollService)
  pageService = inject(PageService)
  ngOnInit(): void {
    this.scrollService.setNavbarOpaque(true);
    this.pageService.getPage("politique-de-confidentialite").subscribe((res)=>{
      this.content=res.page
    })
  }
}
