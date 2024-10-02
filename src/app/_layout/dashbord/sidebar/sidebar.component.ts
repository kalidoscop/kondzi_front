import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { navbarData } from './nav-data';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule,NgFor,NgIf],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  navData = navbarData

}
