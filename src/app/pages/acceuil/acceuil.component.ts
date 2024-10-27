import { Component, HostListener, inject, OnInit } from '@angular/core';
import { CarouselModule } from '../component/carousel/carousel.module';
// import { Youtube } from 'angular-feather/icons';
import { RouterLink } from '@angular/router';
import { FooterComponent } from '../component/footer/footer.component';
import { ScrollService } from '../../_services/scroll.service';


@Component({
  selector: 'app-acceuil',
  standalone: true,
  imports: [CarouselModule,RouterLink,FooterComponent],
  templateUrl: './acceuil.component.html',
  styleUrl: './acceuil.component.scss',
})
export class AcceuilComponent implements OnInit {
  ngOnInit(): void {
    const scriptTag = document.createElement('script')
    scriptTag.src = 'https://www.youtube.com/iframe_api'
    document.body.appendChild(scriptTag)
  }
  scrollService = inject(ScrollService)
  

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
  
}
