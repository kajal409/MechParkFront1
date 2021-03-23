/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
// import { HttpProviderService } from '../_services/http-provider.service';
import { Space } from '../_models/space';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../_services/user.service';
import { GarageService } from '../_services/garage.service';
import { SpaceService } from '../_services/space.service';
import { ParkingService } from '../_services/parking.service';
import { User } from '../_models/user';
import { ParkingManager } from '../_models/parkingManager';
import { Garage } from '../_models/garage';
import { AllocationManager } from '../_models/allocationManager';
import { Parking } from '../_models/parking';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user: User;
  userInfo: User;
  parkingManager: ParkingManager;
  garageId: number;
  garage: Garage;
  allocationManager: AllocationManager;
  spaceId: number;
  space: Space;
  spaces: Space[];
  otherSpaces: Space[];
  isGuest = true;
  canPark: boolean;
  parking: Parking;
  displayedColumns: string[] = [
    'code',
    'totalCapacity',
    'occupiedCapacity',
    'action'
  ];

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private garageService: GarageService,
    private spaceService: SpaceService,
    private parkingService: ParkingService,
    private router: Router
  ) {
    this.isGuest = true;
  }

  delete(): void {
    this.userService.delete(this.user.id).pipe(first()).subscribe();
    this.userService.logout();
    this.isGuest = true;
  }

  logout(): void {
    this.userService.logout();
    this.router.navigate(['/home']);
    this.isGuest = true;
  }

  deleteGarage(): void {
    this.garageService.delete(this.garage.id).subscribe(() => {
      this.userService
        .getParkingManager(this.user.id)
        .pipe()
        .subscribe((x) => {
          this.parkingManager = x;
          this.garageId = this.parkingManager.garageId;
          this.garageService
            .getById(this.garageId)
            .pipe()
            .subscribe((y) => {
              this.garage = y;
            });
        });
    });
  }

  deleteSpace(id: number): void {
    this.spaceService
      .delete(id)
      .pipe()
      .subscribe(() => {
        if (this.user && this.user.role == 'AllocationManager') {
          this.userService
            .getAllocationManager(this.user.id)
            .pipe()
            .subscribe((x) => {
              this.allocationManager = x;
              this.spaceService.getAll().subscribe((data) => {
                this.otherSpaces = data;
                this.otherSpaces = this.otherSpaces.filter((x) => {
                  return x.allocationManagerId === this.allocationManager.id;
                });
                const spaces: Space[] = this.otherSpaces;
              });
            });
        }
      });
  }

  checkIn() {
    this.userService.user.subscribe((user) => {
      this.user = user;
      if (user == null) {
      } else {
        this.parkingService.checkin().subscribe(() => {
          this.parkingService
            .getByUser(this.user.id)
            .pipe()
            .subscribe((x) => {
              this.parking = x;
            });
        });
      }
    });
  }

  checkOut() {
    this.userService.user.subscribe((user) => {
      this.user = user;
      if (user == null) {
      } else {
        this.parkingService.checkout().subscribe(() => {
          this.parkingService
            .getByUser(this.user.id)
            .pipe(first())
            .subscribe((x) => {
              this.parking = x;
              if (!x) {
                this.canPark = true;
              } else {
                this.parking = x;
              }
            });
        });
      }
    });
  }

  ngOnInit(): void {
    this.isGuest = true;
    this.userService.user.subscribe((user) => {
      this.user = user;
      if (user == null) {
      } else {
        this.userService
          .getById(this.user.id)
          .pipe(first())
          .subscribe((userInfo) => {
            this.userInfo = userInfo;
          });
        if (user && user.role) {
          this.isGuest = false;
        } else {
          this.isGuest = true;
        }
      }
    });
    if (this.user && this.user.role == 'ParkingManager') {
      this.userService
        .getParkingManager(this.user.id)
        .pipe(first())
        .subscribe((x) => {
          this.parkingManager = x;
          this.garageId = this.parkingManager.garageId;
          this.garageService
            .getById(this.garageId)
            .pipe()
            .subscribe((y) => {
              this.garage = y;
            });
        });
    }

    if (this.user && this.user.role == 'AllocationManager') {
      this.userService
        .getAllocationManager(this.user.id)
        .pipe(first())
        .subscribe((x) => {
          this.allocationManager = x;
          this.spaceService.getAll().subscribe((data) => {
            this.otherSpaces = data;
            this.otherSpaces = this.otherSpaces.filter((x) => {
              return x.allocationManagerId === this.allocationManager.id;
            });
            const spaces: Space[] = this.otherSpaces;
          });
        });
    }

    if (this.user && this.user.role == 'User') {
      this.parkingService
        .getByUser(this.user.id)
        .pipe(first())
        .subscribe((x) => {
          if (!x) {
            this.canPark = true;
            this.parking = new Parking();
          } else {
            this.parking = x;
          }
        });
    }
  }
}
