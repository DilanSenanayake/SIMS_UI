import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StudentService } from 'src/app/services/student.service';
import { Student } from 'src/app/models/student.model';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.css']
})

export class EditStudentComponent {
  student: Student|null = null;
  
  constructor(
    private router: Router, 
    private dialogRef: MatDialogRef<EditStudentComponent>, 
    private studentService: StudentService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit() {
    this.studentService.getStudentById(this.data.studentId).subscribe(
      (response: any) => {
      this.student = response.data;
    });
  }

  closePopup(): void {
    this.router.navigate(['/home']);
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
