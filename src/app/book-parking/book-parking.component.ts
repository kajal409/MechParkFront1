/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Router } from '@angular/router';
import { Space } from '../_models/space';
import { UserService } from '../_services/user.service';
import { GarageService } from '../_services/garage.service';
import { SpaceService } from '../_services/space.service';
import { ParkingService } from '../_services/parking.service';
import { Garage } from '../_models/garage';
import { User } from '../_models/user';

@Component({
  selector: 'app-book-parking',
  templateUrl: './book-parking.component.html',
  styleUrls: ['./book-parking.component.css']
})
export class BookParkingComponent implements OnInit {
  bookParkingForm: FormGroup;
  submitted = false;
  user: User;
  garages: Garage[];
  spaces: Space[];
  selectedGarageId: number;
  selectedGarage = false;
  selectedSpaceId: number;
  selectedSpace = false;
  withCleaningServiceFlag: boolean;
  hasCleaningService: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private garageService: GarageService,
    private spaceService: SpaceService,
    private parkingService: ParkingService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userService.user.subscribe((user) => {
      this.user = user;
    });

    this.garageService.getAll().subscribe((data) => {
      this.garages = data;
    });

    this.bookParkingForm = this.formBuilder.group({
      garageId: this.formBuilder.control('', [Validators.required]),
      spaceId: this.formBuilder.control('', [Validators.required]),
      vehicleNumber: this.formBuilder.control('', [Validators.required]),
      driverName: this.formBuilder.control('', [Validators.required]),
      withCleaningService: this.formBuilder.control('', [Validators.required])
    });

    this.bookParkingForm.controls['withCleaningService'].setValue(false);
    this.withCleaningServiceFlag = false;
  }

  selectGarage(
    id: number,
    garageOccupiedCapacity: string,
    garageTotalCapacity: string,
    hasCleaningService: boolean
  ): void {
    if (this.selectedGarageId == id) {
      this.selectedGarage = !this.selectedGarage;
      this.bookParkingForm.controls['garageId'].reset();
      this.bookParkingForm.controls['spaceId'].reset();
      this.selectedGarageId = 0;
      this.selectedSpaceId = 0;
    } else {
      this.selectedGarage = true;
      // this.selectedGarageId = id;
      this.bookParkingForm.controls['spaceId'].reset();
      this.selectedSpaceId = 0;
      if (garageOccupiedCapacity < garageTotalCapacity) {
        this.selectedGarageId = id;
        this.spaceService
          .getByGarageId(this.selectedGarageId)
          .subscribe((data) => {
            this.spaces = data;
          });
        this.bookParkingForm.controls['garageId'].setValue(
          this.selectedGarageId
        );
        this.hasCleaningService = hasCleaningService;
        if (!hasCleaningService) {
          this.bookParkingForm.controls[
            'withCleaningService'
          ].clearValidators();
          this.bookParkingForm.controls['withCleaningService'].setValue(false);
        }
      } else {
        this.selectedGarage = false;
      }
    }
  }

  selectSpace(
    id: number,
    spaceOccupiedCapacity: string,
    spaceTotalCapacity: string
  ): void {
    if (this.selectedSpaceId == id) {
      this.selectedSpace = !this.selectedSpace;
      this.bookParkingForm.controls['spaceId'].reset();
      this.selectedSpaceId = 0;
    } else {
      this.selectedSpace = true;
      // this.selectedSpaceId = id;
      if (spaceOccupiedCapacity < spaceTotalCapacity) {
        this.selectedSpaceId = id;
        this.bookParkingForm.controls['spaceId'].setValue(this.selectedSpaceId);
      }
    }
  }

  get f() {
    return this.bookParkingForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    alert(JSON.stringify(this.bookParkingForm.value));
    console.log(JSON.stringify(this.bookParkingForm.value));

    this.parkingService
      .book(this.bookParkingForm.value)
      .pipe()
      .subscribe(
        () => {
          this._snackBar.open(`✓ Parking Booked`, '', {
            duration: 1500,
            horizontalPosition: 'right',
            verticalPosition: 'bottom'
          });
          this.router.navigate(['']);
        },
        (error) => {
          this._snackBar.open(`✗ Error ${error}`, '', {
            duration: 1500,
            horizontalPosition: 'right',
            verticalPosition: 'bottom'
          });
          this.onReset();
          console.log(error);
        }
      );
  }

  onReset(): void {
    this.submitted = false;
    this.bookParkingForm.reset();
  }
}
