import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private coursesSource = new BehaviorSubject<string[]>([]);
  courses$ = this.coursesSource.asObservable();
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  updateCourses(courses: string[]) {
    this.coursesSource.next(courses);
  }
  getCourses(): Observable<any> {
    return this.http.get(this.apiUrl + 'courses').pipe(
      tap((response: any) => {
        this.updateCourses(response.data);
      })
    );
  }
}