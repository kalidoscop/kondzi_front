import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../_services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
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
