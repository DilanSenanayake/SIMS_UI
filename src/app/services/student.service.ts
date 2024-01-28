import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private studentsSource = new BehaviorSubject<string[]>([]);
  students$ = this.studentsSource.asObservable();
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  updateStudents(students: string[]) {
    this.studentsSource.next(students);
  }
  getStudents(): Observable<any> {
    return this.http.get(this.apiUrl + 'students').pipe(
      tap((response: any) => {
        this.updateStudents(response.data);
      })
    );
  }
  addStudent(firstName: string, lastName: string, email:string): Observable<any> {
    const student = { firstName: firstName, lastName: lastName, email:email };
    return this.http.post(this.apiUrl + 'students', student);
  }
}