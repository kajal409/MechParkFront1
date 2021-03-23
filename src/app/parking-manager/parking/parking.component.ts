import { Component, OnInit, ViewChild } from '@angular/core';

import { UserService } from 'src/app/_services/user.service';
import { GarageService } from 'src/app/_services/garage.service';
import { SpaceService } from 'src/app/_services/space.service';
import { ParkingService } from 'src/app/_services/parking.service';
import { Router } from '@angular/router';
import { User } from 'src/app/_models/user';
import { Space } from 'src/app/_models/space';
import { Garage } from 'src/app/_models/garage';
import { ParkingManager } from 'src/app/_models/parkingManager';
import { Parking } from 'src/app/_models/parking';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import {
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/animations';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-parking',
  templateUrl: './parking.component.html',
  styleUrls: ['./parking.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      )
    ])
  ]
})
export class ParkingComponent implements OnInit {
  user: User;
  parkingManager: ParkingManager;
  garage: Garage;
  space: Space;
  spaces: Space[] = [];
  parking: Parking;
  parkings: Parking[];
  userInfo: User;
  parkingSource: MatTableDataSource<Parking>;
  spaceSource: MatTableDataSource<Space>;
  expandedElement: Parking | null;
  parkingColumnsToDisplay = [
    'vehicleNumber',
    'driverName',
    'isActive',
    'spaceCode'
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private userService: UserService,
    private garageService: GarageService,
    private spaceService: SpaceService,
    private parkingService: ParkingService,
    private router: Router
  ) {
    this.parkingSource = new MatTableDataSource();
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.parkingSource.filter = filterValue.trim().toLowerCase();

    if (this.parkingSource.paginator) {
      this.parkingSource.paginator.firstPage();
    }
  }

  ngOnInit(): void {
    this.userService.user.subscribe((user) => {
      this.user = user;
      if (user == null) {
      } else {
        this.userService
          .getById(this.user.id)
          .pipe()
          .subscribe((userInfo) => {
            this.userInfo = userInfo;
            this.parkingSource = new MatTableDataSource<Parking>(this.parkings);
            this.parkingSource.paginator = this.paginator;
            this.parkingSource.sort = this.sort;
          });
      }
    });

    this.userService
      .getParkingManager(this.user.id)
      .subscribe((parkingManager) => {
        this.parkingManager = parkingManager;
        this.garageService
          .getById(this.parkingManager && this.parkingManager.garageId)
          .subscribe((garage) => {
            this.garage = garage;
            this.parkingSource = new MatTableDataSource<Parking>(this.parkings);
            this.parkingSource.paginator = this.paginator;
            this.parkingSource.sort = this.sort;
          });

        this.parkingService
          .getByGarage(this.parkingManager && this.parkingManager.garageId)
          .subscribe((parkings) => {
            this.parkings = parkings;
            this.parkingSource = new MatTableDataSource<Parking>(parkings);
            for (let i = 0; i < parkings.length; i++) {
              this.spaceService
                .getById(this.parkings[i].spaceId)
                .subscribe((space) => {
                  this.spaces.push(space);
                  this.parkingSource.paginator = this.paginator;
                  this.parkingSource.sort = this.sort;
                });
            }
          });
      });
  }
  /*ngAfterViewInit(): void {
    this.parkingSource.paginator = this.paginator;
    this.parkingSource.sort = this.sort;
  }*/
}
