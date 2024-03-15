import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Division } from '../../../models/division';
import { ApiService } from '../../../service/api.service';
import { DivisionItemComponent } from '../../single-items/division-item/division-item.component';
import { Team } from '../../../models/team';

@Component({
  selector: 'app-division-list',
  standalone: true,
  imports: [DivisionItemComponent],
  templateUrl: './division-list.component.html',
  styleUrl: './division-list.component.css',
})
export class DivisionListComponent implements OnInit {
  @Input() divisions: Division[] = [];
  @Input() teams: Team[] = [];
  @Output() refreshHomeDivisions: EventEmitter<void> = new EventEmitter<void>();


  constructor(private apiService: ApiService) {}
  ngOnInit(): void {}

  refreshDivisions(){
    this.refreshHomeDivisions.emit();
  }
}

