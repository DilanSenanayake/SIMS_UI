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
  loginUsername: string = '';
  loginPassword: string = '';

  constructor(private router: Router, private authService: AuthService) { }

  toggleForm() {
    this.showSignup = !this.showSignup;
  }

  onLogin() {
    this.authService.login(this.loginUsername, this.loginPassword).subscribe(
      (loginResponse) => {
        this.router.navigate(['/dashboard']);
      },
      (error) => {
        console.error('Login failed:', error);
      }
    );
}


  onSignUp() {
    this.router.navigate(['/signUp']);
  }
}
