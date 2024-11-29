import { Component, inject, OnInit } from '@angular/core';
import { ScrollService } from '../../_services/scroll.service';
import { PageService } from '../../_services/page.service';
import { FooterComponent } from '../component/footer/footer.component';

@Component({
  selector: 'app-nos-mission',
  standalone: true,
  imports: [FooterComponent],
  templateUrl: './nos-mission.component.html',
  styleUrl: './nos-mission.component.scss'
})
export class NosMissionComponent implements OnInit{
  content:string = ''
  scrollService = inject(ScrollService)
  pageService = inject(PageService)
  ngOnInit(): void {
    this.scrollService.setNavbarOpaque(true);
    this.pageService.getNosmission().subscribe((res)=>{
      this.content=res.page
    })
  }
}
