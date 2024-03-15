import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Event } from '../../../models/event';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-event-detail-popup',
  standalone: true,
  imports: [MatButton],
  templateUrl: './event-detail-popup.component.html',
  styleUrl: './event-detail-popup.component.css',
})
export class EventDetailPopupComponent implements OnInit {
  inputEvent: Event | undefined;

  constructor(
    public dialogRef: MatDialogRef<EventDetailPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public event: Event
  ) {}

  ngOnInit(): void {
    this.inputEvent = this.event;
  }

  closeModal(): void {
    this.dialogRef.close();
  }
}
