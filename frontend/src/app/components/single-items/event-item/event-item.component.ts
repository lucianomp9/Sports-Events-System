import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Event } from '../../../models/event';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../service/api.service';
import { MatDialog } from '@angular/material/dialog';
import { EventDetailPopupComponent } from '../../popups/event-detail-popup/event-detail-popup.component';


@Component({
  selector: 'app-event-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './event-item.component.html',
  styleUrls: ['./event-item.component.css'],
  providers: [ApiService]
})
export class EventItemComponent implements OnInit {
  @Input() event: Event | undefined;
  @Output() refreshEvents: EventEmitter<void> = new EventEmitter<void>();
  @Input() isFirst: boolean = false;
  
  winner: string | undefined;
  homeGoals: number | undefined;
  awayGoals: number | undefined;

  constructor(private apiService: ApiService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.homeGoals = this.event?.homeGoals;
    this.awayGoals = this.event?.awayGoals;

    this.getWinner();
  }

  deleteEvent() {
    if (this.event?.uuid) {
      this.apiService.deleteEvent(this.event?.uuid).subscribe((result) => {
        if (result) {
          this.refreshEvents.emit(); //Emit void event to list for refreshing events.
        }
      });
    }
  }

  getWinner(): void {
    if (this.homeGoals && this.awayGoals)
      if (this.homeGoals > this.awayGoals) { //If home team scored more goals than away team, it's the winner.
        this.winner = 'homeTeam'; 
      } else {
        this.winner = 'awayTeam';
      }
  }

  openDetailModal(): void {
    const dialogRef = this.dialog.open(EventDetailPopupComponent, {
      width: '500px',
      data: this.event, // Pass event to modal
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }
}
