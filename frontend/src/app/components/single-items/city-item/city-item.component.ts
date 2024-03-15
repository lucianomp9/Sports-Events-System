import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { City } from '../../../models/city';
import { ApiService } from '../../../service/api.service';
import { EditCityComponent } from '../../popups/edit-popups/edit-city/edit-city.component';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-city-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './city-item.component.html',
  styleUrl: './city-item.component.css',
})
export class CityItemComponent implements OnInit {
  @Input() city: City | undefined;
  @Input() isFirst: boolean = false;

  @Output() refreshCities: EventEmitter<void> = new EventEmitter<void>();

  constructor(private apiService: ApiService, private dialog: MatDialog) {}

  ngOnInit() {}

  deleteCity() {
    if (this.city?.id) {
      this.apiService.deleteCity(this.city.id).subscribe((result) => {
        if (result) {
          this.refreshCities.emit(); // Trigger refresh cities
        }
      });
    }
  }

  openCityEditPopup() {
    const dialogRef = this.dialog.open(EditCityComponent, {
      width: '40%',
      height: 'auto',
      enterAnimationDuration: 200,
      exitAnimationDuration: 200,
      data: {
        city: this.city,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.refreshCities.emit();
      }
    });
  }
}
