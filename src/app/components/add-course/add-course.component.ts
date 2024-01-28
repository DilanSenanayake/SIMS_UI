import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CourseService } from 'src/app/services/course.service';


@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})


export class AddCourseComponent {
  courseName: string = '';
  
  constructor(private router: Router, private dialogRef: MatDialogRef<AddCourseComponent>, private courseService: CourseService,
    private snackBar: MatSnackBar) {}

  closePopup(): void {
    this.router.navigate(['/home']);
    this.dialogRef.close();
  }

  addCourse(): void {
    this.courseService.addCourse(this.courseName).subscribe(
      (response) => {
        this.showNotification('Success!', 'success');
        this.courseService.getCourses().subscribe(
          (response) => {
            this.router.navigate(['/home']);
          }
        ); 
      },
      (error) => {
        console.error(error);
        this.showNotification(error.message, 'error');
      }
    );
    this.dialogRef.close();
  }

  showNotification(message: string, type: 'success' | 'error') {
    const panelClass = type === 'success' ? ['success-snackbar'] : ['error-snackbar'];

    this.snackBar.open(message, '', {
      duration: 5000,
      horizontalPosition: 'end',
      verticalPosition: 'bottom',
      panelClass: ['error-snackbar'],
      politeness: 'assertive',
      announcementMessage: message
    });
  }
}
