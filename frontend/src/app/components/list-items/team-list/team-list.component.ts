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
  orderByTeamName: boolean = true; 
  @Output() refreshHomeTeams: EventEmitter<void> = new EventEmitter<void>();

  constructor() {}

  ngOnInit() {
    this.sortTeams();
  }

  refreshTeams() {
    this.refreshHomeTeams.emit();
  }

  toggleOrderBy() {
    this.orderByTeamName = !this.orderByTeamName;
    this.sortTeams();
  }

  sortTeams() {
    if(this.orderByTeamName){
      this.teams.sort((a, b) => a.name.localeCompare(b.name)); // Sort by team name
    }else{
      this.teams.sort((b, a) => a.name.localeCompare(b.name));
    }
  }
}
