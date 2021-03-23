import { Component, OnInit, ViewChild } from '@angular/core';

import { UserService } from 'src/app/_services/user.service';
import { GarageService } from 'src/app/_services/garage.service';
import { SpaceService } from 'src/app/_services/space.service';
import { ParkingService } from 'src/app/_services/parking.service';
import { Router } from '@angular/router';
import { User } from 'src/app/_models/user';
import { Space } from 'src/app/_models/space';
import { Garage } from 'src/app/_models/garage';
import { MatTableDataSource } from '@angular/material/table';
import { ParkingHistory } from 'src/app/_models/parkingHistory';
import { AllocationManager } from 'src/app/_models/allocationManager';
import {
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/animations';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-parking-histories',
  templateUrl: './parking-histories.component.html',
  styleUrls: ['./parking-histories.component.css'],
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
export class ParkingHistoriesComponent implements OnInit {
  user: User;
  allocationManager: AllocationManager;
  garage: Garage;
  space: Space;
  spaces: Space[] = [];
  parkingHistory: ParkingHistory;
  parkingHistories: ParkingHistory[];
  userInfo: User;
  parkingHistorySource: MatTableDataSource<ParkingHistory>;
  spaceSource: MatTableDataSource<Space>;
  expandedElement: ParkingHistory | null;
  parkingHistoryColumnsToDisplay = [
    'vehicleNumber',
    'driverName',
    'spaceCode',
    'cost',
    'interval'
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
    // this.parkingHistorySource = new MatTableDataSource();
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.parkingHistorySource.filter = filterValue.trim().toLowerCase();

    if (this.parkingHistorySource.paginator) {
      this.parkingHistorySource.paginator.firstPage();
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
            this.parkingHistorySource = new MatTableDataSource<ParkingHistory>(
              this.parkingHistories
            );
            this.parkingHistorySource.paginator = this.paginator;
            this.parkingHistorySource.sort = this.sort;
          });
      }
    });

    this.parkingService.getAllParkingHistory().subscribe((parkingHistories) => {
      this.parkingHistories = parkingHistories;
      this.parkingHistorySource = new MatTableDataSource<ParkingHistory>(
        parkingHistories
      );

      //this.parkingHistorySource.sort = this.sort;
      this.parkingHistorySource = new MatTableDataSource<ParkingHistory>(
        this.parkingHistories
      );
      this.parkingHistorySource.paginator = this.paginator;
      this.parkingHistorySource.sort = this.sort;

      for (let i = 0; i < parkingHistories.length; i++) {
        this.spaceService
          .getById(this.parkingHistories[i].spaceId)
          .subscribe((space) => {
            this.spaces.push(space);
            this.parkingHistorySource.paginator = this.paginator;
            this.parkingHistorySource.sort = this.sort;
          });
      }
    });
  }

  /*ngAfterViewInit(): void {
    this.parkingHistorySource.paginator = this.paginator;
    this.parkingHistorySource.sort = this.sort;
  }*/
}
