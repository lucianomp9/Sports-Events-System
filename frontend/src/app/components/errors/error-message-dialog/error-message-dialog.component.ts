import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-error-message-dialog',
  standalone: true,
  imports: [],
  templateUrl: './error-message-dialog.component.html',
  styleUrl: './error-message-dialog.component.css',
})
export class ErrorMessageDialogComponent implements OnInit {
  errorMessage: string | undefined;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { message: string },
    private dialogRef: MatDialogRef<ErrorMessageDialogComponent>
  ) {}
  ngOnInit() {
    this.errorMessage = this.data.message;

    setTimeout(() => {
      this.dialogRef.close();
    }, 3900);
  }
}
