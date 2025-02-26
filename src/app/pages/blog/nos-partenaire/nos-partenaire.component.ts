import { Component, inject } from '@angular/core';
import { FooterComponent } from '../../component/footer/footer.component';
import { ScrollService } from '../../../_services/scroll.service';
import { PageService } from '../../../_services/page.service';
import { BlogComponent } from "../../component/blog/blog.component";

@Component({
  selector: 'app-nos-partenaire',
  standalone: true,
  imports: [FooterComponent, BlogComponent],
  templateUrl: './nos-partenaire.component.html',
  styleUrl: './nos-partenaire.component.scss'
})
export class NosPartenaireComponent {
  content:string = ''
  scrollService = inject(ScrollService)
  pageService = inject(PageService)
  ngOnInit(): void {
    this.scrollService.setNavbarOpaque(true);
    this.pageService.getPage("nos-partenaires").subscribe((res)=>{
      this.content=res.page
    })
  }
}
