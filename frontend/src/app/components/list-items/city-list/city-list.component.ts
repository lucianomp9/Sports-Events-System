import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { City } from '../../../models/city';
import { CityItemComponent } from '../../single-items/city-item/city-item.component';

@Component({
  selector: 'app-city-list',
  standalone: true,
  imports: [CityItemComponent],
  templateUrl: './city-list.component.html',
  styleUrl: './city-list.component.css',
})
export class CityListComponent implements OnInit {
  @Input() cities: City[] = [];
  @Output() refreshHomeCities: EventEmitter<void> = new EventEmitter<void>();

  constructor() {}

  ngOnInit() {}
  refreshCities() {
    this.refreshHomeCities.emit();
  }
}
