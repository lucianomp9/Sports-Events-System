import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Team } from '../../../models/team';
import { TeamItemComponent } from '../../single-items/team-item/team-item.component';
import { Stadium } from '../../../models/stadium';
import { City } from '../../../models/city';
import { Division } from '../../../models/division';

@Component({
  selector: 'app-team-list',
  standalone: true,
  imports: [CommonModule, TeamItemComponent],
  templateUrl: './team-list.component.html',
  styleUrl: './team-list.component.css',
})
export class TeamListComponent implements OnInit {
  @Input() teams: Team[] = [];
  @Input() stadiums: Stadium[] = [];
  @Input() cities: City[] = [];
  @Input() divisions: Division[] = [];
  @Output() refreshHomeTeams: EventEmitter<void> = new EventEmitter<void>();

  constructor() {}

  ngOnInit() {}

  refreshTeams() {
    this.refreshHomeTeams.emit();
  }
}
