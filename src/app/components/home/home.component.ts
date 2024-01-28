import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { AddStudentComponent } from '../add-student/add-student.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  students: string[] = [];
  courses: string[] = [];
  isAddStudentPopupVisible = false;

  constructor(private router: Router, private authService: AuthService, private dialog: MatDialog) { }

  ngOnInit() {
    this.authService.getStudents().subscribe(
      (response) => {
        this.students = response.data;
      }
    );
    this.authService.getCourses().subscribe(
      (response) => {
        this.courses = response.data;
      }
    );
  }

  onAddStudent() {
    this.openPopup();
  }

  onAddCourse() {
    this.router.navigate(['/addCourse']);
  }

  onCloseAddStudentPopup() {
    this.isAddStudentPopupVisible = false;
  }

  openPopup(): void {
    const dialogRef = this.dialog.open(AddStudentComponent, {
      width: '400px',
    });

    // Optionally, you can subscribe to the afterClosed event to perform actions after the popup is closed
    dialogRef.afterClosed().subscribe(result => {
      console.log('The popup was closed with result:', result);
    });
  }
}
