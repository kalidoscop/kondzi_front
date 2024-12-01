import { Component, inject } from '@angular/core';
import { FooterComponent } from '../component/footer/footer.component';
import { PageService } from '../../_services/page.service';
import { ScrollService } from '../../_services/scroll.service';

@Component({
  selector: 'app-qui-sommes-nous',
  standalone: true,
  imports: [FooterComponent],
  templateUrl: './qui-sommes-nous.component.html',
  styleUrl: './qui-sommes-nous.component.scss'
})
export class QuiSommesNousComponent {
  content:string = ''
  scrollService = inject(ScrollService)
  pageService = inject(PageService)
  ngOnInit(): void {
    this.scrollService.setNavbarOpaque(true);
    this.pageService.getPage("qui-sommes-nous").subscribe((res)=>{
      this.content=res.page
    })
  }
}
