import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  showSignup: boolean = false;
  userName: string = '';
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private router: Router, private authService: AuthService) { }

  toggleForm() {
    this.showSignup = !this.showSignup;
    this.errorMessage = '';
  }

  onLogin() {
    this.authService.login(this.email, this.password).subscribe(
      (loginResponse) => {
        this.router.navigate(['/home']);
        this.errorMessage = '';
      },
      (error) => {
        console.error('Login failed:', error);
        this.errorMessage = 'Login failed. Please check your credentials.';
      }
    );
}
  onSignUp() {
    this.authService.signUp(this.userName, this.email, this.password).subscribe(
      (loginResponse) => {
        this.router.navigate(['/home']);
        this.errorMessage = '';
      },
      (error) => {
        console.error('Signin failed:', error);
        this.errorMessage = 'Signin failed. Email already exists.';
      }
    );
  }
}
