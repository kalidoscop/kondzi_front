import { Component, inject, OnInit } from '@angular/core';
import { ScrollService } from '../../../_services/scroll.service';
import { PageService } from '../../../_services/page.service';
import { FooterComponent } from '../../component/footer/footer.component';
import { BlogComponent } from "../../component/blog/blog.component";

@Component({
  selector: 'app-mentions-legales',
  standalone: true,
  imports: [FooterComponent, BlogComponent],
  templateUrl: './mentions-legales.component.html',
  styleUrl: './mentions-legales.component.scss'
})
export class MentionsLegalesComponent implements OnInit{
  content:string = ''
  scrollService = inject(ScrollService)
  pageService = inject(PageService)
  ngOnInit(): void {
    this.scrollService.setNavbarOpaque(true);
    this.pageService.getPage("mentions-legales").subscribe((res)=>{
      this.content=res.page
    })
  }
}
