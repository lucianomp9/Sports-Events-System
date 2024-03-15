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
  selector: 'app-edit-city',
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
  templateUrl: './edit-city.component.html',
  styleUrl: './edit-city.component.css',
  providers: [ApiService],
})
export class EditCityComponent implements OnInit {
  @Input() inputData: any;
  city: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<EditCityComponent>,
    private builder: FormBuilder,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.inputData = this.data;
    this.city = this.inputData.city;

    this.myForm = this.builder.group({
      name: [
        this.city.name,
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
    name: this.builder.control('', [
      Validators.required,
      Validators.maxLength(40),
      Validators.pattern(/^\S.*\S$/),
    ]),
  });

  updateCity() {
    this.apiService
      .updateCity(this.myForm.value, this.city.id)
      .subscribe((res) => {
        this.closePopup(true);
        this.apiService.refreshCities$;
      });
  }
}
