import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { EventListComponent } from '../components/list-items/event-list/event-list.component';
import { MatButtonModule } from '@angular/material/button';
import { TeamListComponent } from '../components/list-items/team-list/team-list.component';
import { StadiumListComponent } from '../components/list-items/stadium-list/stadium-list.component';
import { CityListComponent } from '../components/list-items/city-list/city-list.component';
import { EventItemComponent } from '../components/single-items/event-item/event-item.component';
import { StadiumItemComponent } from '../components/single-items/stadium-item/stadium-item.component';
import { CityItemComponent } from '../components/single-items/city-item/city-item.component';
import { TeamItemComponent } from '../components/single-items/team-item/team-item.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { PopupEventComponent } from '../components/popups/create-popups/popup-event/popup-event.component';
import { Team } from '../models/team';
import { City } from '../models/city';
import { PopupTeamComponent } from '../components/popups/create-popups/popup-team/popup-team.component';
import { Stadium } from '../models/stadium';
import { Event } from '../models/event';
import { PopupStadiumComponent } from '../components/popups/create-popups/popup-stadium/popup-stadium.component';
import { PopupCityComponent } from '../components/popups/create-popups/popup-city/popup-city.component';
import { Division } from '../models/division';
import { DivisionListComponent } from '../components/list-items/division-list/division-list.component';
import { PopupDivisionComponent } from '../components/popups/create-popups/popup-division/popup-division.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    EventListComponent,
    MatButtonModule,
    TeamListComponent,
    StadiumListComponent,
    CityListComponent,
    EventItemComponent,
    StadiumItemComponent,
    CityItemComponent,
    TeamItemComponent,
    MatDialogModule,
    DivisionListComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  providers: [ApiService],
})
export class HomeComponent implements OnInit {
  teams: Team[] = [];
  cities: City[] = [];
  stadiums: Stadium[] = [];
  events: Event[] = [];
  divisions: Division[] = [];
  selectedListType: string = 'Events'; // Default selected list

  constructor(private dialog: MatDialog, private apiService: ApiService) {}

  ngOnInit(): void {
    //Event
    this.apiService.getEvent().subscribe((events) => {
      this.events = events;
    });

    this.apiService.refreshEvents$.subscribe(() => {
      this.apiService.getEvent().subscribe((events) => {
        this.events = events;
      });
    });

    //Team
    this.apiService.getTeam().subscribe((teams) => {
      this.teams = teams;
    });

    this.apiService.refreshTeams$.subscribe(() => {
      this.apiService.getTeam().subscribe((teams) => {
        this.teams = teams;
      });
    });

    //City
    this.apiService.getCity().subscribe((cities) => {
      this.cities = cities;
    });

    this.apiService.refreshCities$.subscribe(() => {
      this.apiService.getCity().subscribe((cities) => {
        this.cities = cities;
      });
    });

    //Stadium
    this.apiService.getStadium().subscribe((stadiums) => {
      this.stadiums = stadiums;
    });

    this.apiService.refreshStadiums$.subscribe(() => {
      this.apiService.getStadium().subscribe((stadiums) => {
        this.stadiums = stadiums;
      });
    });

    //Division
    this.apiService.getDivision().subscribe((divisions) => {
      this.divisions = divisions;
    });

    this.apiService.refreshDivisions$.subscribe(() => {
      this.apiService.getDivision().subscribe((divisions) => {
        this.divisions = divisions;
      });
    });
  }

  refreshHomeEvents() {
    this.apiService.refreshEvents$.next();
  }

  refreshHomeTeams() {
    this.apiService.refreshTeams$.next();

    //To spread and see changes in other components after updation
    this.refreshHomeEvents();
  }
  refreshHomeStadiums() {
    this.apiService.refreshStadiums$.next();

    //To spread and see changes in other components after updation
    this.refreshHomeEvents();
    this.refreshHomeTeams();
  }
  refreshHomeCities() {
    this.apiService.refreshCities$.next();

    //To spread and see changes in other components after updation
    this.refreshHomeEvents();
    this.refreshHomeTeams();
  }

  refreshHomeDivisions() {
    this.apiService.refreshDivisions$.next();

    //To spread and see changes in other components after updation
    this.refreshHomeEvents();
    this.refreshHomeTeams();
  }
  //List entity selector
  onListToggleClick(listType: string) {
    this.selectedListType = listType;
  }

  // CREATE EVENT POPUP
  openEventPopup() {
    const dialogRef = this.dialog.open(PopupEventComponent, {
      width: '40%',
      height: 'auto',
      enterAnimationDuration: 200,
      exitAnimationDuration: 200,
      data: {
        title: 'Create new event!',
        teams: this.teams,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.apiService.refreshEvents$.next(); // Trigger refreshEvents if result === true, so an event was created.
      }
    });
  }

  // CREATE TEAM POPUP
  openTeamPopup() {
    const dialogRef = this.dialog.open(PopupTeamComponent, {
      width: '30%',
      height: 'auto',
      enterAnimationDuration: 200,
      exitAnimationDuration: 200,
      data: {
        cities: this.cities,
        stadiums: this.stadiums,
        divisions: this.divisions,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.apiService.refreshTeams$.next(); // Trigger refreshTeams if result === true, so a team was created.
      }
    });
  }

  // CREATE STADIUM POPUP
  openStadiumPopup() {
    const dialogRef = this.dialog.open(PopupStadiumComponent, {
      width: '20%',
      height: 'auto',
      enterAnimationDuration: 200,
      exitAnimationDuration: 200,
      data: {
        title: 'Create new Stadium!',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.apiService.refreshStadiums$.next(); // Trigger refreshStadiums if result === true, so a team was created.
      }
    });
  }

  // CREATE CITY POPUP
  openCityPopup() {
    const dialogRef = this.dialog.open(PopupCityComponent, {
      width: '20%',
      height: 'auto',
      enterAnimationDuration: 200,
      exitAnimationDuration: 200,
      data: {
        title: 'Create new City!',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.apiService.refreshCities$.next();
      }
    });
  }

  // CREATE DIVISION POPUP
  openDivisionPopup() {
    const dialogRef = this.dialog.open(PopupDivisionComponent, {
      width: '20%',
      height: 'auto',
      enterAnimationDuration: 200,
      exitAnimationDuration: 200,
      data: {
        title: 'Create new Division!',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.apiService.refreshDivisions$.next(); // Trigger refreshDivisions if result === true, so a Division was created.
      }
    });
  }
}
