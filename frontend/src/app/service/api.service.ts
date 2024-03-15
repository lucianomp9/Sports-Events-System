import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { Stadium } from '../models/stadium';
import { Team } from '../models/team';
import { City } from '../models/city';
import { Event } from '../models/event';
import { Division } from '../models/division';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private API_URL = 'http://localhost:8080/api/v1';

  // Refresh for re-rendering
  private _refreshEvents$ = new Subject<void>();
  private _refreshTeams$ = new Subject<void>();
  private _refreshStadiums$ = new Subject<void>();
  private _refreshCities$ = new Subject<void>();
  private _refreshDivisions$ = new Subject<void>();

  constructor(private http: HttpClient) {}

  

  get refreshEvents$() {
    return this._refreshEvents$;
  }

  public saveEvent(event: any): Observable<Event> {
    return this.http.post<Event>(`${this.API_URL}/match`, event);
  }

  public getEvent(): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.API_URL}/match`);
  }

  public getEventById(uuid: string): Observable<Event> {
    return this.http.get<Event>(`${this.API_URL}/match/${uuid}`);
  }

  public deleteEvent(uuid: string) {
    return this.http.delete<Event>(`${this.API_URL}/match/${uuid}`).pipe(
      tap(() => {
        this._refreshEvents$.next();
      })
    );
  }

  // *TEAM*

  get refreshTeams$() {
    return this._refreshTeams$;
  }

  public saveTeam(team: any): Observable<Team> {
    return this.http.post<Team>(`${this.API_URL}/team`, team).pipe(
      tap(() => {
        this._refreshTeams$.next();
      })
    );
  }

  public deleteTeam(id: number) {
    return this.http.delete<Team>(`${this.API_URL}/team/${id}`);
  }

  public getTeam(): Observable<Team[]> {
    return this.http.get<Team[]>(`${this.API_URL}/team`);
  }

  public updateTeam(team: any, id: number) {
    return this.http.put<Team>(`${this.API_URL}/team/${id}`, team).pipe(
      tap(() => {
        this._refreshTeams$.next();
      })
    );
  }

  // *STADIUM*

  get refreshStadiums$() {
    return this._refreshStadiums$;
  }

  public deleteStadium(id: number) {
    return this.http.delete<Stadium>(`${this.API_URL}/stadium/${id}`).pipe(
      tap(() => {
        this.refreshStadiums$.next();
      })
    );
  }

  public saveStadium(stadium: any): Observable<Stadium> {
    return this.http.post<Stadium>(`${this.API_URL}/stadium`, stadium).pipe(
      tap(() => {
        this._refreshStadiums$.next();
      })
    );
  }

  public getStadium(): Observable<Stadium[]> {
    return this.http.get<Stadium[]>(`${this.API_URL}/stadium`);
  }

  public updateStadium(stadium: any, id: number) {
    return this.http
      .put<Stadium>(`${this.API_URL}/stadium/${id}`, stadium)
      .pipe(
        tap(() => {
          this._refreshStadiums$.next();
        })
      );
  }

  // *CITY*

  get refreshCities$() {
    return this._refreshCities$;
  }

  public saveCity(city: any): Observable<City> {
    return this.http.post<City>(`${this.API_URL}/city`, city).pipe(
      tap(() => {
        this._refreshCities$.next();
      })
    );
  }

  public getCity(): Observable<City[]> {
    return this.http.get<City[]>(`${this.API_URL}/city`);
  }

  public deleteCity(id: number) {
    return this.http.delete<City>(`${this.API_URL}/city/${id}`).pipe(
      tap(() => {
        this.refreshCities$.next();
      })
    );
  }

  public updateCity(city: any, id: number) {
    return this.http.put<City>(`${this.API_URL}/city/${id}`, city).pipe(
      tap(() => {
        this._refreshCities$.next();
      })
    );
  }

  // *DIVISION*

  get refreshDivisions$() {
    return this._refreshDivisions$;
  }

  public saveDivision(division: any): Observable<Division> {
    return this.http.post<Division>(`${this.API_URL}/division`, division).pipe(
      tap(() => {
        this._refreshDivisions$.next();
      })
    );
  }

  public deleteDivision(id: number) {
    return this.http.delete<Division>(`${this.API_URL}/division/${id}`).pipe(
      tap(() => {
        this.refreshDivisions$.next();
      })
    );
  }

  public getDivision(): Observable<Division[]> {
    return this.http.get<Division[]>(`${this.API_URL}/division`);
  }

  public updateDivision(division: any, id: number) {
    return this.http
      .put<Division>(`${this.API_URL}/division/${id}`, division)
      .pipe(
        tap(() => {
          this._refreshDivisions$.next();
        })
      );
  }
}
