import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EventItemComponent } from '../../single-items/event-item/event-item.component';
import { Event } from '../../../models/event';

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [EventItemComponent],
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.css',
})
export class EventListComponent implements OnInit {
  @Input() events: Event[] = [];
  @Output() refreshHomeEvents: EventEmitter<void> = new EventEmitter<void>();
  orderByRecent: boolean = true;

  constructor() {}

  ngOnInit(): void {
    this.sortEvents();
  }

  refreshEvents() {
    this.refreshHomeEvents.emit();
    this.sortEvents();
  }
  toggleOrderBy() {
    this.orderByRecent = !this.orderByRecent;
    this.sortEvents();
  }
  sortEvents() {
    if (this.orderByRecent) {
      this.events.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    } else {
      this.events.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      );
    }
  }
}
