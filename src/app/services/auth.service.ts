import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/v1/';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    const loginCredentials = { email: email, password: password };
    return this.http.post(this.apiUrl + 'login', loginCredentials);
  }
  signUp(name: string, email: string, password: string): Observable<any> {
    const signUpCredentials = {name: name, email: email, password: password };
    return this.http.post(this.apiUrl + 'signin', signUpCredentials);
  }
  getStudents(): Observable<any> {
    return this.http.get(this.apiUrl + 'students');
  }
  getCourses(): Observable<any> {
    return this.http.get(this.apiUrl + 'courses');
  }
  addStudent(firstName: string, lastName: string, email:string): Observable<any> {
    const student = { firstName: firstName, lastName: lastName, email:email };
    return this.http.post(this.apiUrl + 'students', student);
  }
}
