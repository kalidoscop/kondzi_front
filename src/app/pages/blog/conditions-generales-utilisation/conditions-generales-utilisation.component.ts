import { Component, inject, OnInit } from '@angular/core';
import { ScrollService } from '../../../_services/scroll.service';
import { PageService } from '../../../_services/page.service';
import { FooterComponent } from '../../component/footer/footer.component';
import { BlogComponent } from "../../component/blog/blog.component";

@Component({
  selector: 'app-conditions-generales-utilisation',
  standalone: true,
  imports: [FooterComponent, BlogComponent],
  templateUrl: './conditions-generales-utilisation.component.html',
  styleUrl: './conditions-generales-utilisation.component.scss'
})
export class ConditionsGeneralesUtilisationComponent implements OnInit{
  content:string = ''
  scrollService = inject(ScrollService)
  pageService = inject(PageService)
  ngOnInit(): void {
    this.scrollService.setNavbarOpaque(true);
    this.pageService.getPage("conditions-generales-utilisation").subscribe((res)=>{
      this.content=res.page
    })
  }
}
