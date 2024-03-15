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
    // Asigna el valor de homeGoals aquí después de que event haya sido inicializado
    this.homeGoals = this.event?.homeGoals;
    this.awayGoals = this.event?.awayGoals;

    this.getWinner();
  }

  deleteEvent() {
    if (this.event?.uuid) {
      this.apiService.deleteEvent(this.event?.uuid).subscribe((result) => {
        if (result) {
          this.refreshEvents.emit();
        }
      });
    }
  }

  getWinner(): void {
    if (this.homeGoals && this.awayGoals)
      if (this.homeGoals > this.awayGoals) {
        this.winner = 'homeTeam'; // No hay suficientes datos para determinar el ganador
      } else {
        this.winner = 'awayTeam';
      }
  }

  openDetailModal(): void {
    const dialogRef = this.dialog.open(EventDetailPopupComponent, {
      width: '500px', // Ancho del modal
      data: this.event, // Pasa el evento al modal
    });

    dialogRef.afterClosed().subscribe(result => {
      // Maneja el resultado del modal si es necesario
    });
  }
}
