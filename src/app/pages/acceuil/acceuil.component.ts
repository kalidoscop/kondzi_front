import { Component, HostListener, inject, OnInit } from '@angular/core';
import { CarouselModule } from '../component/carousel/carousel.module';
// import { Youtube } from 'angular-feather/icons';
import { RouterLink } from '@angular/router';
import { FooterComponent } from '../component/footer/footer.component';
import { ScrollService } from '../../_services/scroll.service';
import { ModalComponent } from '../component/modal/modal.component';
import { ArticleService } from '../../_services/article.service';
import { Article } from '../../_model/article';
import { formatDate, NgIf, registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { environment } from '../../../environments/environment';

registerLocaleData(localeFr, 'fr');



@Component({
  selector: 'app-acceuil',
  standalone: true,
  imports: [CarouselModule,RouterLink,FooterComponent,ModalComponent,NgIf],
  templateUrl: './acceuil.component.html',
  styleUrl: './acceuil.component.scss',
})
export class AcceuilComponent implements OnInit {
  baseUrl:string = `${environment.baseUrl}uploads/`
  articles : Article[]=[]
  ngOnInit(): void {
    this.loadArticles()
  }
  loadArticles(){
    this.articleService.getArticles().subscribe((res)=>{
      this.articles=res
      console.log(this.articles);
      

    })
  }

  // ngOnInit(): void {
  //   // const scriptTag = document.createElement('script')
  //   // scriptTag.src = 'https://www.youtube.com/iframe_api'
  //   // document.body.appendChild(scriptTag)
  // }
  scrollService = inject(ScrollService)
  articleService = inject(ArticleService)
  

  images = [
    {
      imageSrc: 'images/image defilante.jpg',
      imageAlt: 'image1',
      text:'Plateforme réseau N°1 des acteurs professionnels de santé au Togo'
    },
    {
      imageSrc: 'images/01.jpg',
      imageAlt: 'image2',
      text:'Une urgence vitale de santé, consultez KONDZI.COM'
    },
    {
      imageSrc: 'images/02.jpg',
      imageAlt: 'image3',
      text:'Des informations en santé fiables à portée de main sur KONDZI.COM'
    },
    
    {
      imageSrc: 'images/03.jpg',
      imageAlt: 'image4',
      text:'KONDZI.COM, des renseignements 24h/24 partout au Togo'
    },
  ];
  navbarOpaque = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const triggerDiv = document.getElementById('trigger-div');
    if (triggerDiv) {
      const triggerPosition = triggerDiv.getBoundingClientRect().top;
      const navbarHeight = 40; // Hauteur de votre barre de navigation

      // Vérifie si la div de référence atteint la position de la navbar
      // this.navbarOpaque = triggerPosition <= navbarHeight;
      this.scrollService.setNavbarOpaque(triggerPosition <= navbarHeight);
    }
  }

  showModal = false;

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  Date(date: string | null | undefined): string {
    if (date) {
      return formatDate(date, 'shortDate', 'fr-FR');
    }
    return '';
  }

  
}
