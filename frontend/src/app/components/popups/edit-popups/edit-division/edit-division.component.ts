import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../../../service/api.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-division',
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
  templateUrl: './edit-division.component.html',
  styleUrl: './edit-division.component.css',
  providers: [ApiService],
})
export class EditDivisionComponent implements OnInit {
  @Input() inputData: any;
  division: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<EditDivisionComponent>,
    private builder: FormBuilder,
    private apiService: ApiService
  ) {}
  ngOnInit(): void {
    this.inputData = this.data;
    this.division = this.inputData.division;

    this.myForm = this.builder.group({
      name: [
        this.division.name,
        [
          Validators.required,
          Validators.maxLength(40),
          Validators.pattern(/^\S.*\S$/),
        ],
      ],
    });
  }

  closePopup(value: boolean) {
    this.ref.close(value);
  }

  myForm = this.builder.group({
    name: this.builder.control(''),
  });

  updateDivision() {
    this.apiService
      .updateDivision(this.myForm.value, this.division.id)
      .subscribe((res) => {
        this.closePopup(true);
        this.apiService.refreshDivisions$;
      });
  }
}
