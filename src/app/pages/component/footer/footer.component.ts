import { Component } from '@angular/core';
import { IconsModule } from '../../../_icons/icons.module';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [IconsModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  network = [
    { logo: 'facebook', link: 'https://www.facebook.com/profile.php?id=61562908653355&mibextid=ZbWKwL' },
    { logo: 'twitter', link: 'https://x.com/kondzi_com' },
    { logo: 'youtube', link: 'https://www.youtube.com/@kondzi_com' },
  ];
  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
