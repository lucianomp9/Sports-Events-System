import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Division } from '../../../models/division';
import { ApiService } from '../../../service/api.service';
import { Team } from '../../../models/team';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-division-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './division-item.component.html',
  styleUrl: './division-item.component.css',
  providers: [ApiService],
})
export class DivisionItemComponent implements OnInit {
  @Input() division: Division | undefined;
  @Input() teams: Team[] = [];
  @Input() isFirst: boolean = false;
  @Output() refreshDivisions: EventEmitter<void> = new EventEmitter<void>();

  teamsCount: number | undefined;
  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.countTeams();
  }
  deleteDivision() {
    if (this.division?.id) {
      this.apiService.deleteDivision(this.division.id).subscribe((result) => {
        if (result) {
          this.refreshDivisions.emit();
        }
      });
    }
  }

  countTeams() {
    this.teamsCount = this.teams.filter(
      (team) => team.division.id === this.division!.id
    ).length;
  }
}
