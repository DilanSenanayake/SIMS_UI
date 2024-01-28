import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})

export class AddStudentComponent {
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  errorMessage:string = '';
  
  constructor(private router: Router, private dialogRef: MatDialogRef<AddStudentComponent>, private studentService: StudentService,
    private snackBar: MatSnackBar) {}

  closePopup(): void {
    this.router.navigate(['/home']);
    this.dialogRef.close();
  }

  addStudent(): void {
    this.studentService.addStudent(this.firstName, this.lastName, this.email).subscribe(
      (response) => {
        this.showNotification('Success!', 'success');
        this.studentService.getStudents().subscribe(
          (response) => {
            this.router.navigate(['/home']);
            this.errorMessage = '';
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
