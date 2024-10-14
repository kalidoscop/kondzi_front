import { Component, inject } from '@angular/core';
import { CarouselModule } from '../component/carousel/carousel.module';

@Component({
  selector: 'app-acceuil',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './acceuil.component.html',
  styleUrl: './acceuil.component.scss',
})
export class AcceuilComponent {
  

  images = [
    {
      imageSrc: 'images/01.jpg',
      imageAlt: 'image2',
      text:'Une urgence vitale de santé, consultez KONDZI.COM'
    },
    {
      imageSrc: 'images/02.jpg',
      imageAlt: 'image1',
      text:'Des informations en santé fiables à portée de main sur KONDZI.COM'
    },
    
    {
      imageSrc: 'images/03.jpg',
      imageAlt: 'image3',
      text:'KONDZI.COM, des renseignements 24h/24 partout au Togo'
    },
  ];

  
}
