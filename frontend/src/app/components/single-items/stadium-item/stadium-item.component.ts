import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Stadium } from '../../../models/stadium';
import { ApiService } from '../../../service/api.service';
import { MatDialog } from '@angular/material/dialog';
import { EditStadiumComponent } from '../../popups/edit-popups/edit-stadium/edit-stadium.component';
import { CommonModule } from '@angular/common';
import { ErrorMessageDialogComponent } from '../../errors/error-message-dialog/error-message-dialog.component';
@Component({
  selector: 'app-stadium-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stadium-item.component.html',
  styleUrl: './stadium-item.component.css',
})
export class StadiumItemComponent implements OnInit {
  @Input() stadium: Stadium | undefined;
  @Output() refreshStadiums: EventEmitter<void> = new EventEmitter<void>();
  @Input() isFirst: boolean = false;
  constructor(private apiService: ApiService, private dialog: MatDialog) {}
  ngOnInit(): void {}

  deleteStadium() {
    if (this.stadium?.id) {
      this.apiService.deleteStadium(this.stadium.id).subscribe({
        next: (res) => {
          if (res) {
            this.refreshStadiums.emit();
          }
        },
        error: () => {
          this.dialog.open(ErrorMessageDialogComponent, {
            data: {
              message:
                'Unable to delete stadium. Please delete all teams associated with this stadium first.',
            },
          });
        },
      });
    }
  }

  openStadiumEditPopup() {
    const dialogRef = this.dialog.open(EditStadiumComponent, {
      width: '40%',
      height: 'auto',
      enterAnimationDuration: 200,
      exitAnimationDuration: 200,
      data: {
        stadium: this.stadium,
        title: 'Update Stadium',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.refreshStadiums.emit();
      }
    });
  }
}
