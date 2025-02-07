import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PubliciteService } from '../../../../_services/publicite.service';
import { Router, RouterModule } from '@angular/router';
import { IconsModule } from '../../../../_icons/icons.module';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-publicite-add',
  standalone: true,
  imports: [ReactiveFormsModule,IconsModule,NgIf,RouterModule],
  templateUrl: './publicite-add.component.html',
  styleUrl: './publicite-add.component.scss'
})
export class PubliciteAddComponent {
publiciteService = inject(PubliciteService);
  private router = inject(Router);



  pubForm = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
  });
  
  imageUrl: any;
  fileToUpload: any;

  handleFileInput(e: Event) {
    const input = e.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.fileToUpload = input.files[0];

      //Show image preview
      let reader = new FileReader();
      reader.onload = (event: any) => {
        this.imageUrl = event.target.result;
      };
      reader.readAsDataURL(this.fileToUpload);
    }
  }

  onSubmit() {
    console.log(this.pubForm.value);
    this.publiciteService
      .addPublicite(this.pubForm.value, this.fileToUpload as File)
      .subscribe(() => {
        this.router.navigate(['dashboard/pub']);
      });
  }
}
