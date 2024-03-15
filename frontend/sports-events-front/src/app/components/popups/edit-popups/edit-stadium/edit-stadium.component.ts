import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../../../service/api.service';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-stadium',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatDialogModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
  ],
  templateUrl: './edit-stadium.component.html',
  styleUrl: './edit-stadium.component.css',
  providers: [ApiService],
})
export class EditStadiumComponent implements OnInit {
  @Input() inputData: any;
  stadium: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<EditStadiumComponent>,
    private builder: FormBuilder,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.inputData = this.data;
    this.stadium = this.inputData.stadium;

    this.myForm = this.builder.group({
      name: [
        this.stadium.name,
        [
          Validators.required,
          Validators.maxLength(30),
          Validators.pattern(/^\S.*\S$/),
        ],
      ],
      capacity: [
        this.stadium.capacity,
        [Validators.required, Validators.min(1), Validators.max(300000)],
      ],
    });
  }

  closePopup(value: boolean) {
    this.ref.close(value);
  }

  myForm = this.builder.group({
    name: this.builder.control([
      '',
      Validators.required,
      Validators.maxLength(30),
      Validators.pattern(/^\S.*\S$/),
    ]),
    capacity: this.builder.control([
      '',
      Validators.required,
      Validators.min(1),
      Validators.max(300000),
    ]),
  });

  updateStadium() {
    this.apiService
      .updateStadium(this.myForm.value, this.stadium.id)
      .subscribe((res) => {
        this.closePopup(true);
        this.apiService.refreshStadiums$;
      });
  }
}
