import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../_services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { IconsModule } from '../../_icons/icons.module';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,IconsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  authService = inject(AuthService)
  private router= inject(Router) 


  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  })

  login(){
    // console.warn(this.loginForm.value);
    this.authService.login(this.loginForm.value).subscribe(()=>{
      return this.router.navigate(['dashboard']);
    })
    
  }
}
