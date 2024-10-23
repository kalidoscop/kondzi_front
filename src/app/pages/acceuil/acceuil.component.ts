import { Component, inject, OnInit } from '@angular/core';
import { CarouselModule } from '../component/carousel/carousel.module';
import { Youtube } from 'angular-feather/icons';
import {YouTubePlayer,YouTubePlayerModule  } from '@angular/youtube-player';
import { RouterLink } from '@angular/router';
import { FooterComponent } from '../component/footer/footer.component';


@Component({
  selector: 'app-acceuil',
  standalone: true,
  imports: [CarouselModule,YouTubePlayer,YouTubePlayerModule,RouterLink,FooterComponent],
  templateUrl: './acceuil.component.html',
  styleUrl: './acceuil.component.scss',
})
export class AcceuilComponent implements OnInit {
  ngOnInit(): void {
    const scriptTag = document.createElement('script')
    scriptTag.src = 'https://www.youtube.com/iframe_api'
    document.body.appendChild(scriptTag)
  }
  

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
