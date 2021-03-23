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
import { AllocationManager } from 'src/app/_models/allocationManager';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-space',
  templateUrl: './space.component.html',
  styleUrls: ['./space.component.css'],
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
export class SpaceComponent implements OnInit {
  user: User;
  allocationManager: AllocationManager;
  garage: Garage;
  space: Space;
  spaces: Space[];
  userInfo: User;
  spaceSource: MatTableDataSource<Space>;
  expandedElement: Space | null;
  spaceColumnsToDisplay = [
    'code',
    'occupiedCapacity',
    'totalCapacity',
    'actions'
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private userService: UserService,
    private garageService: GarageService,
    private spaceService: SpaceService,
    private parkingService: ParkingService,
    private router: Router
  ) {}

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.spaceSource.filter = filterValue.trim().toLowerCase();

    if (this.spaceSource.paginator) {
      this.spaceSource.paginator.firstPage();
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
            this.spaceSource = new MatTableDataSource<Space>(this.spaces);
            this.spaceSource.paginator = this.paginator;
            this.spaceSource.sort = this.sort;
          });
      }
    });

    this.userService
      .getAllocationManager(this.user.id)
      .subscribe((allocationManager) => {
        this.allocationManager = allocationManager;
        this.spaceService
          .getByAllocationManager(this.allocationManager.id)
          .subscribe((spaces) => {
            this.spaces = spaces;
            this.spaceSource = new MatTableDataSource<Space>(spaces);
            this.spaceSource.paginator = this.paginator;
            this.spaceSource.sort = this.sort;
          });
      });
  }
}
