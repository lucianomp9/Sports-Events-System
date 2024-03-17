import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../../../service/api.service';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { ErrorMessageDialogComponent } from '../../../errors/error-message-dialog/error-message-dialog.component';
@Component({
  selector: 'app-popup-stadium',
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSelectModule,
    CommonModule,
  ],
  templateUrl: './popup-stadium.component.html',
  styleUrl: './popup-stadium.component.css',
  providers: [ApiService],
})
export class PopupStadiumComponent implements OnInit {
  @Input() inputData: any;
  errorMessage: string | undefined;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<PopupStadiumComponent>,
    private builder: FormBuilder,
    private apiService: ApiService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.inputData = this.data;

    this.myForm = this.builder.group({
      name: [
        '',
        [
          Validators.required,
          Validators.maxLength(30),
          Validators.pattern(/^\S.*\S$/),
        ],
      ],
      capacity: [
        '',
        [Validators.required, Validators.min(1), Validators.max(300000)],
      ],
    });
  }
  closePopup(value: boolean) {
    this.ref.close(value);
  }

  myForm = this.builder.group({
    name: this.builder.control(''),
    capacity: this.builder.control(''),
  });

  saveStadium() {
    this.apiService.saveStadium(this.myForm.value).subscribe({
      next: (res) => {
        this.closePopup(true);
      },
      error: (err) => {
        // If error is handled in API, sent personalized message.
        if (typeof err.error === 'string') {
          this.errorMessage = err.error;
        } else {
          // Sent default error message + details
          this.errorMessage = 'An error ocurred: ' + err.error.detail;
        }
        this.dialog.open(ErrorMessageDialogComponent, {
          data: {
            message: this.errorMessage,
          },
        });
      },
    });
  }
}
