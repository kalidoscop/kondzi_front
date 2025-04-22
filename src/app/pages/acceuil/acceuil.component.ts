import { Component, HostListener, inject, OnInit } from '@angular/core';
import { CarouselModule } from '../component/carousel/carousel.module';
// import { Youtube } from 'angular-feather/icons';
import { Router, RouterLink } from '@angular/router';
import { FooterComponent } from '../component/footer/footer.component';
import { ScrollService } from '../../_services/scroll.service';
import { ModalComponent } from '../component/modal/modal.component';
import { ArticleService } from '../../_services/article.service';
import { Article } from '../../_model/article';
import { formatDate, NgClass, NgIf, registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { environment } from '../../../environments/environment';
import { VisiteService } from '../../_services/visite.service';
import { IconsModule } from '../../_icons/icons.module';
import { UadresseService } from '../../_services/uadresse.service';
import { UtilAdresse } from '../../_model/uadresse';
import { AlerteService } from '../../_services/alerte.service';

registerLocaleData(localeFr, 'fr');

@Component({
  selector: 'app-acceuil',
  standalone: true,
  imports: [
    CarouselModule,
    RouterLink,
    FooterComponent,
    ModalComponent,
    NgIf,
    IconsModule,
    NgClass,
  ],
  templateUrl: './acceuil.component.html',
  styleUrl: './acceuil.component.scss',
})
export class AcceuilComponent implements OnInit {
  baseUrl: string = `${environment.baseUrl}uploads/`;
  articles: Article[] = [];
  uadresses: UtilAdresse[] = [];

  trackingService = inject(VisiteService);
  private uadresseService = inject(UadresseService);
  private alertService = inject(AlerteService);
  private router = inject(Router)

  ngOnInit(): void {
    this.scrollService.setNavbarOpaque(false);
    this.loadArticles();
    this.loadUadresse();
    this.trackingService.getVisitorInfo().then((data) => {
      if (this.trackingService.isFirstVisit()) {
        this.trackingService.sendVisitData(data).subscribe((response) => {
          console.log('Visit recorded:', response);
          this.trackingService.markVisitAsRecorded();
        });
      }
    });
  }
  loadUadresse() {
    this.uadresseService.getUtilAdresses().subscribe((res) => {
      this.uadresses = res;
    });
  }
  loadArticles() {
    this.articleService.getArticles().subscribe((res) => {
      this.articles = res;
      console.log(this.articles);
    });
  }

  // ngOnInit(): void {
  //   // const scriptTag = document.createElement('script')
  //   // scriptTag.src = 'https://www.youtube.com/iframe_api'
  //   // document.body.appendChild(scriptTag)
  // }
  scrollService = inject(ScrollService);
  articleService = inject(ArticleService);

  images = [
    {
      imageSrc: 'images/image defilante.jpg',
      imageAlt: 'image1',
      text: 'Plateforme réseau N°1 des acteurs professionnels de santé en Afrique',
    },
    {
      imageSrc: 'images/01.jpg',
      imageAlt: 'image2',
      text: 'Une urgence vitale de santé, consultez KONDZI.COM',
    },
    {
      imageSrc: 'images/02.jpg',
      imageAlt: 'image3',
      text: 'Des informations en santé fiables à portée de main sur KONDZI.COM',
    },

    {
      imageSrc: 'images/03.jpg',
      imageAlt: 'image4',
      text: 'KONDZI.COM, des renseignements 24h/24 partout en Afrique',
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

  goToArticle(id: string) {
    this.router.navigate(['/article/', id])
  }

  shareArticle(article: any,event: MouseEvent) {
    event.stopPropagation();
    const url = `${window.location.origin}/article/${article.id}`;

    try {
      navigator
        .share({
          title: article.title,
          text:`${article.title}
          `,
          url: url,
        })
        .then(() => {
          console.log('Partagé avec succès');
        })
        .catch((error) => {
          console.error('Erreur de partage', error);
        });
    } catch (error) {
      // alert("Le partage n'est pas supporté sur ce navigateur.")
      navigator.clipboard.writeText(url).then(() => {
        this.alertService.creatAlert('success', 'Lien copié dans le presse-papiers !', 3000);
      });
    }

    // if (navigator.share) {

    // } else {
    //   // Fallback si la Web Share API n’est pas supportée

    // }
  }

  Date(date: string | null | undefined): string {
    if (date) {
      return formatDate(date, 'shortDate', 'fr-FR');
    }
    return '';
  }
}
