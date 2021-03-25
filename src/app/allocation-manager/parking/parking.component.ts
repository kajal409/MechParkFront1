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
import { AllocationManager } from 'src/app/_models/allocationManager';
import { MatSnackBar } from '@angular/material/snack-bar';
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
  allocationManager: AllocationManager;
  garage: Garage;
  space: Space;
  spaces: Space[] = [];
  parking: Parking;
  parkings: Parking[];
  userInfo: User;
  parkingSource: MatTableDataSource<Parking>;
  spaceSource: MatTableDataSource<Space>;
  expandedElement: Parking | null;
  parkingColumnsToDisplay = ['vehicleNumber', 'driverName', 'actions'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private userService: UserService,
    private garageService: GarageService,
    private spaceService: SpaceService,
    private parkingService: ParkingService,
    private _snackBar: MatSnackBar,
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

  checkIn(id: number): void {
    // console.log(id);
    this.parkingService
      .systemCheckin(id)
      .pipe()
      .subscribe(
        () => {
          this._snackBar.open('✓ User Checked In', '', {
            duration: 1500,
            horizontalPosition: 'right',
            verticalPosition: 'bottom'
          });
          this.parkingService
            .getByAllocationManager(this.allocationManager.id)
            .subscribe((parkings) => {
              this.parkings = parkings;
              this.parkingSource = new MatTableDataSource<Parking>(parkings);
              this.parkingSource.paginator = this.paginator;
              this.parkingSource.sort = this.sort;
              // console.log(
              //   '🚀 ~ file: parking.component.ts ~ line 96 ~ ParkingComponent ~ .subscribe ~ parkings',
              //   parkings
              // );
            });
        },
        (error) => {
          console.log(error);
        }
      );
  }

  checkOut(id: number): void {
    this.parkingService
      .systemCheckout(id)
      .pipe()
      .subscribe(
        () => {
          this._snackBar.open('✓ User Checked Out', '', {
            duration: 1500,
            horizontalPosition: 'right',
            verticalPosition: 'bottom'
          });
          this.parkingService
            .getByAllocationManager(this.allocationManager.id)
            .subscribe((parkings) => {
              this.parkings = parkings;
              this.parkingSource = new MatTableDataSource<Parking>(parkings);
              this.parkingSource.paginator = this.paginator;
              this.parkingSource.sort = this.sort;
              // console.log(
              //   '🚀 ~ file: parking.component.ts ~ line 96 ~ ParkingComponent ~ .subscribe ~ parkings',
              //   parkings
              // );
            });
        },
        (error) => {
          console.log(error);
        }
      );
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
      .getAllocationManager(this.user.id)
      .subscribe((allocationManager) => {
        this.allocationManager = allocationManager;
        // console.log(this.allocationManager.id);
        this.spaceService
          .getByAllocationManager(this.allocationManager.id)
          .subscribe((spaces) => {
            this.spaces = spaces;
            this.parkingSource = new MatTableDataSource<Parking>(this.parkings);
            this.parkingSource.paginator = this.paginator;
            this.parkingSource.sort = this.sort;
          });

        this.parkingService
          .getByAllocationManager(this.allocationManager.id)
          .subscribe((parkings) => {
            this.parkings = parkings;
            this.parkingSource = new MatTableDataSource<Parking>(parkings);
            this.parkingSource.paginator = this.paginator;
            this.parkingSource.sort = this.sort;
            // console.log(
            //   '🚀 ~ file: parking.component.ts ~ line 96 ~ ParkingComponent ~ .subscribe ~ parkings',
            //   parkings
            // );
          });
      });
  }
}
