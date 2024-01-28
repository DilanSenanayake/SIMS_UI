import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { AddStudentComponent } from '../add-student/add-student.component';
import { StudentService } from 'src/app/services/student.service';
import { CourseService } from 'src/app/services/course.service';
import { AddCourseComponent } from '../add-course/add-course.component';
import { Student } from 'src/app/models/student.model';
import { EditStudentComponent } from '../edit-student/edit-student.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  students: Student[] = [];
  courses: string[] = [];
  isAddStudentPopupVisible = false;

  constructor(private router: Router, private authService: AuthService, 
    private dialog: MatDialog, public studentService: StudentService,
    public courseService: CourseService) { }

  ngOnInit() {
    this.studentService.getStudents().subscribe();
    this.courseService.getCourses().subscribe();
    this.studentService.students$.subscribe(students => {
      this.students = students;
    });
    this.courseService.courses$.subscribe(courses => {
      this.courses = courses;
    });
  }

  onAddCourse() {
    const dialogRef = this.dialog.open(AddCourseComponent, {
      width: '400px',
    });
  }

  onCloseAddStudentPopup() {
    this.isAddStudentPopupVisible = false;
  }

  onAddStudent(): void {
    const dialogRef = this.dialog.open(AddStudentComponent, {
      width: '400px',
    });
  }

  onStudent(studentId: string) {
    const dialogRef = this.dialog.open(EditStudentComponent, {
      width: '400px',
      data: { studentId: studentId }
    });
  }
}
