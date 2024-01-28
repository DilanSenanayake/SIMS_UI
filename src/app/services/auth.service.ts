import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { StudentService } from './student.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private studentService: StudentService) {}

  login(email: string, password: string): Observable<any> {
    const loginCredentials = { email: email, password: password };
    return this.http.post(this.apiUrl + 'login', loginCredentials);
  }
  signUp(name: string, email: string, password: string): Observable<any> {
    const signUpCredentials = {name: name, email: email, password: password };
    return this.http.post(this.apiUrl + 'signin', signUpCredentials);
  }
}
