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
import { ParkingHistory } from 'src/app/_models/parkingHistory';

@Component({
  selector: 'app-garage',
  templateUrl: './garage.component.html',
  styleUrls: ['./garage.component.css'],
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
export class GarageComponent implements OnInit {
  user: User;
  parkingManager: ParkingManager;
  garage: Garage;
  space: Space;
  spaces: Space[];
  parking: Parking;
  parkings: Parking[];
  userInfo: User;
  parkingSource: MatTableDataSource<Parking>;
  expandedElement: Parking | null;
  parkingColumnsToDisplay = [
    'vehicleNumber',
    'driverName',
    'isActive',
    'userCheckIn'
  ];

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
          });
      }
    });

    this.userService
      .getParkingManager(this.user.id)
      .subscribe((parkingManager) => {
        this.parkingManager = parkingManager;
        this.garageService
          .getById(this.parkingManager.garageId)
          .subscribe((garage) => {
            this.garage = garage;
          });

        this.parkingService.getByGarage(this.parkingManager.garageId).subscribe(
          (parkings) => {
            this.parkings = parkings;
            this.parkingSource = new MatTableDataSource<Parking>(parkings);
          },
          (error) => {
            console.log(error);
          }
        );
      });
  }
}
