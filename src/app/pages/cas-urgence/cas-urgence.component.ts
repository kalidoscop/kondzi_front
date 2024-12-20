import { Component, inject, OnInit } from '@angular/core';
import { ScrollService } from '../../_services/scroll.service';
import { PageService } from '../../_services/page.service';
import { FooterComponent } from '../component/footer/footer.component';

@Component({
  selector: 'app-cas-urgence',
  standalone: true,
  imports: [FooterComponent],
  templateUrl: './cas-urgence.component.html',
  styleUrl: './cas-urgence.component.scss'
})
export class CasUrgenceComponent implements OnInit{
  content:string = ''
  scrollService = inject(ScrollService)
  pageService = inject(PageService)
  ngOnInit(): void {
    this.scrollService.setNavbarOpaque(true);
    this.pageService.getPage("urgence").subscribe((res)=>{
      this.content=res.page
    })
  }
}
