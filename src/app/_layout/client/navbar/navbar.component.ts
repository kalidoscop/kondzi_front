import { Component, inject } from '@angular/core';
import { IconsModule } from '../../../_icons/icons.module';
import { StructureService } from '../../../_services/structure.service';
import { Router, RouterModule } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [IconsModule,ReactiveFormsModule,RouterModule,NgClass],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  structureService = inject(StructureService);
  private router = inject(Router);
  menu :boolean =false

  search = new FormGroup({
    word: new FormControl('', Validators.required),
    zone: new FormControl(''),
    type: new FormControl('', Validators.required),
  });

  onSubmit() {
    // console.log(this.search.value);
    // console.log('coucou');
    this.router.navigate([
      '/annuaire',
      `${this.search.value.word?.trim()}`,
      `${this.search.value.zone?.trim()}`,
      `${this.search.value.type}`,
    ]);
  }
  openMenu(){
    this.menu = ! this.menu
    console.log(this.menu);
    
  }
}
