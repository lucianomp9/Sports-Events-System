import { Event } from './event';
import { City } from './city';
import { Stadium } from './stadium';
import { Division } from './division';

export interface Team {
  id?: number;
  name: string;
  homeMatches?: Event[];
  awayMatches?: Event[];
  division: Division;
  city: City;
  stadium: Stadium;
}
