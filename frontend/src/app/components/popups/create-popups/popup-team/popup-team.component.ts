import { Component, Inject, OnInit, Input } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../../../service/api.service';
import { HttpClientModule } from '@angular/common/http';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { Stadium } from '../../../../models/stadium';
import { City } from '../../../../models/city';
import { Division } from '../../../../models/division';
import { ErrorMessageDialogComponent } from '../../../errors/error-message-dialog/error-message-dialog.component';

@Component({
  selector: 'app-popup',
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
  templateUrl: './popup-team.component.html',
  styleUrl: './popup-team.component.css',
  providers: [ApiService],
})
export class PopupTeamComponent implements OnInit {
  @Input() inputData: any;
  @Input() stadiums: Stadium[] = [];
  @Input() cities: City[] = [];
  @Input() divisions: Division[] = [];
  //ADD division

  // Objects ID's
  selectedStadium: number | undefined;
  selectedCity: number | undefined;
  selectedDivision: number | undefined;

  //Error message for Popup
  errorMessage: string | undefined;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<PopupTeamComponent>,
    private builder: FormBuilder,
    private apiService: ApiService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.inputData = this.data;
    this.cities = this.inputData.cities;
    this.stadiums = this.inputData.stadiums;
    this.divisions = this.inputData.divisions;

    this.myForm = this.builder.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      division: ['', Validators.required],
      stadium: ['', Validators.required],
      city: ['', Validators.required],
    });
  }

  myForm = this.builder.group({
    name: this.builder.control('', [
      Validators.required,
      Validators.maxLength(50),
    ]),
    division: this.builder.control('', Validators.required),
    stadium: this.builder.control('', Validators.required),
    city: this.builder.control('', Validators.required),
  });

  saveTeam() {
    this.apiService.saveTeam(this.myForm.value).subscribe({
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

  closePopup(value: boolean) {
    this.ref.close(value);
  }
}
