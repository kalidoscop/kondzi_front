import { Component, inject, OnInit } from '@angular/core';
import { ScrollService } from '../../../_services/scroll.service';
import { PageService } from '../../../_services/page.service';
import { FooterComponent } from '../../component/footer/footer.component';
import { BlogComponent } from "../../component/blog/blog.component";

@Component({
  selector: 'app-accessibilite-conformite-partielle',
  standalone: true,
  imports: [FooterComponent, BlogComponent],
  templateUrl: './accessibilite-conformite-partielle.component.html',
  styleUrl: './accessibilite-conformite-partielle.component.scss'
})
export class AccessibiliteConformitePartielleComponent implements OnInit{
  content:string = ''
  scrollService = inject(ScrollService)
  pageService = inject(PageService)
  ngOnInit(): void {
    this.scrollService.setNavbarOpaque(true);
    this.pageService.getPage("accessibilite-conformite-partielle").subscribe((res)=>{
      this.content=res.page
    })
  }
}
