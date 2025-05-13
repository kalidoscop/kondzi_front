import { AfterViewInit, Component, Inject, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { IconsModule } from '../../../_icons/icons.module';
// import { CarouselModule } from '../carousel/carousel.module';
import { NgClass, NgOptimizedImage } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PubliciteService } from '../../../_services/publicite.service';
import { Publicite } from '../../../_model/publicite';
import { environment } from '../../../../environments/environment';
import { isPlatformBrowser } from '@angular/common';
import { After } from 'v8';


interface publi {
  imageSrc: string;
  imageAlt: string;
}

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [IconsModule, NgClass, RouterModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent implements OnInit, AfterViewInit {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}
  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
       
      setInterval(() => {
        this.deroule();
        // console.log(this.selectedIndex);
      }, 4000);
    }
  }
  publiciteService = inject(PubliciteService);
  pub: Publicite[] = [];
  baseUrl: string = `${environment.baseUrl}uploads/`;

  network = [
    {
      logo: 'images/icone/FB2.png',
      link: 'https://www.facebook.com/profile.php?id=61562908653355&mibextid=ZbWKwL',
    },
    { logo: 'images/icone/X.png', link: 'https://x.com/kondzi_com' },
    {
      logo: 'images/icone/YTB.png',
      link: 'https://www.youtube.com/@kondzi_com',
    },
    {
      logo: 'images/icone/TK2.png',
      link: 'https://www.tiktok.com/@kondzi.com',
    },
  ];
  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  email = 'contact.kondzi.com@gmail.com';
  tel = '+228 93 49 66 64';
  web = 'www.kondzi.com';

  // images = [
  //   {
  //     imageSrc: 'images/PUB 1.jpg',
  //     imageAlt: 'image1',
  //   },
  //   {
  //     imageSrc: 'images/PUB 2.jpg',
  //     imageAlt: 'image2',
  //   },
  //   {
  //     imageSrc: 'images/PUB 1.jpg',
  //     imageAlt: 'image1',
  //   },
  // ];
  images: publi[] = [];
  selectedIndex = 0;

  ngOnInit(): void {
    // console.log('FooterComponent initialisé');
    // console.log(this.images);

    // setInterval(() => {
    //   this.deroule();
    //   // console.log(this.selectedIndex);
    // }, 4000);
     
    this.loadPub();
    // throw new Error('Method not implemented.');
  }
  loadPub() {
    this.publiciteService.getPublicites().subscribe((res) => {
      // this.pub = res;
      for (let i = 0; i < res.length; i++) {
        const pub = res[i];
        this.images.push({imageAlt:pub.name,imageSrc:`${this.baseUrl}${pub.image}`})
      }
     
    });
  }

  deroule() {
    // console.log(this.selectedIndex);

    if (this.selectedIndex === this.images.length - 1) {
      this.selectedIndex = 0;
    } else {
      this.selectedIndex += 1;
    }
  }
}
