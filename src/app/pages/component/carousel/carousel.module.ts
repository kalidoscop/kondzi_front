import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselComponent } from './carousel.component';
import { ReactiveFormsModule } from '@angular/forms';
import { IconsModule } from '../../../_icons/icons.module';



@NgModule({
  declarations: [CarouselComponent],
  imports: [
    CommonModule,ReactiveFormsModule,IconsModule
  ],
  exports:[CarouselComponent]
})
export class CarouselModule { }
