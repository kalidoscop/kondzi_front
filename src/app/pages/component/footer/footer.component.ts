import { Component } from '@angular/core';
import { IconsModule } from '../../../_icons/icons.module';
import { CarouselModule } from '../carousel/carousel.module';
import { NgClass, NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [IconsModule,CarouselModule,NgClass,NgOptimizedImage],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  network = [
    { logo: 'images/icone/FB2.png', link: 'https://www.facebook.com/profile.php?id=61562908653355&mibextid=ZbWKwL' },
    { logo: 'images/icone/X.png', link: 'https://x.com/kondzi_com' },
    { logo: 'images/icone/YTB.png', link: 'https://www.youtube.com/@kondzi_com' },
    { logo: 'images/icone/TK2.png', link: 'https://www.tiktok.com/@kondzi.com' },
  ];
  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  email = 'contact.kondzi.com@gmail.com'
  tel = '+228 93 49 66 64'
  web = 'www.kondzi.com'

  images = [
    {
      imageSrc: 'images/PUB 1.jpg',
      imageAlt: 'image1',
    },
    {
      imageSrc: 'images/PUB 2.jpg',
      imageAlt: 'image2',
    },
  ];

  selectedIndex =0

  ngOnInit(): void {
    // console.log(this.images);
    
    setInterval(()=>{
      this.deroule()
      // console.log(this.selectedIndex);
      
    },4000)
    
    // throw new Error('Method not implemented.');
  }

  deroule(){
    // console.log(this.selectedIndex);
    
    if (this.selectedIndex === this.images.length-1) {
      this.selectedIndex=0
    }else{

      this.selectedIndex+=1
    }
  }
}
