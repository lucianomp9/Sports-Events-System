import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Division } from '../../../models/division';
import { ApiService } from '../../../service/api.service';
import { Team } from '../../../models/team';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { EditDivisionComponent } from '../../popups/edit-popups/edit-division/edit-division.component';
import { ErrorMessageDialogComponent } from '../../errors/error-message-dialog/error-message-dialog.component';

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
  constructor(private apiService: ApiService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.countTeams();
  }
  deleteDivision() {
    if (this.division?.id) {
      this.apiService.deleteDivision(this.division.id).subscribe({
        next: (res) => {
          if (res) {
            this.refreshDivisions.emit();
          }
        },
        error: () => {
          this.dialog.open(ErrorMessageDialogComponent, {
            data: {
              message:
                'Unable to delete division. Please delete all teams associated with this division first.',
            },
          });
        },
      });
    }
  }

  countTeams() {
    this.teamsCount = this.teams.filter(
      (team) => team.division.id === this.division!.id
    ).length;
  }

  openStadiumEditPopup() {
    const dialogRef = this.dialog.open(EditDivisionComponent, {
      width: '40%',
      height: 'auto',
      enterAnimationDuration: 200,
      exitAnimationDuration: 200,
      data: {
        division: this.division,
        title: 'Update Division',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.refreshDivisions.emit();
      }
    });
  }
}
