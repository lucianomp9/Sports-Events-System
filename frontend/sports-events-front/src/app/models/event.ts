import { Time } from '@angular/common';
import { Stadium } from './stadium';
import { Team } from './team';

export interface Event {
  uuid?: string;
  stadium?: Stadium;
  date: Date;
  time: Time;
  homeTeam: Team;
  awayTeam: Team;
  homeGoals: number;
  awayGoals: number;
  spectators: number;
  ticketPrice: number;
  revenue?: number;
}
