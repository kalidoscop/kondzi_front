import { Component, inject } from '@angular/core';
import { FooterComponent } from '../../component/footer/footer.component';
import { PageService } from '../../../_services/page.service';
import { ScrollService } from '../../../_services/scroll.service';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { BlogComponent } from '../../component/blog/blog.component';

@Component({
  selector: 'app-qui-sommes-nous',
  standalone: true,
  imports: [FooterComponent,CKEditorModule,BlogComponent],
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
