import { Component, Inject, Input, OnInit } from '@angular/core';
import { ApiService } from '../../../../service/api.service';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { Stadium } from '../../../../models/stadium';
import { City } from '../../../../models/city';
import { Division } from '../../../../models/division';

@Component({
  selector: 'app-edit-team',
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
  templateUrl: './edit-team.component.html',
  styleUrl: './edit-team.component.css',
  providers: [ApiService],
})
export class EditTeamComponent implements OnInit{
  @Input() inputData: any;
  @Input() team: any;
  @Input() stadiums: Stadium[] = [];
  @Input() cities: City[] = [];
  @Input() divisions: Division[] = [];
  
  selectedStadium: number | undefined;
  selectedCity: number | undefined;
  selectedDivision: number | undefined;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<EditTeamComponent>,
    private builder: FormBuilder,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.inputData = this.data;
    
    this.team = this.inputData.team;
    this.cities = this.inputData.cities;
    this.stadiums = this.inputData.stadiums;
    this.divisions = this.inputData.divisions;
    this.myForm = this.builder.group({
      name: [this.team.name, [Validators.required, Validators.maxLength(50)]],
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

  updateTeam() {
    this.apiService.updateTeam(this.myForm.value, this.team.id).subscribe((res) => {
      this.closePopup(true);
      this.apiService.refreshTeams$;
    });
  }

  closePopup(value: boolean) {
    this.ref.close(value);
  }
}

