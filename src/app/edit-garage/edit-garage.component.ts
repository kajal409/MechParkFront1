/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from '@angular/forms';
import { first } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

import { GarageService } from '../_services/garage.service';
import { Router } from '@angular/router';
import { UserService } from '../_services/user.service';
import { Garage } from '../_models/garage';
import { ParkingManager } from '../_models/parkingManager';
import { User } from '../_models/user';

@Component({
  selector: 'app-edit-garage',
  templateUrl: './edit-garage.component.html',
  styleUrls: ['./edit-garage.component.css']
})
export class EditGarageComponent implements OnInit {
  garage: Garage;
  user: User;
  parkingManager: ParkingManager;
  garageId: number;
  editGarageForm: FormGroup;
  submitted = false;
  hasCleaningServiceFlag: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private garageService: GarageService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.editGarageForm = this.formBuilder.group({
      name: this.formBuilder.control('', [Validators.required]),
      address: this.formBuilder.control('', [Validators.required]),
      city: this.formBuilder.control('', [Validators.required]),
      state: this.formBuilder.control('', [Validators.required]),
      phone: this.formBuilder.control('', [
        Validators.required,
        Validators.pattern(/^[0-9]*$/),
        Validators.minLength(10),
        Validators.maxLength(10)
      ]),
      parkingRate: this.formBuilder.control('', [
        Validators.required,
        Validators.pattern(/^[0-9]*$/)
      ]),
      hasCleaningService: this.formBuilder.control('', [Validators.required])
    });

    this.editGarageForm.controls['hasCleaningService'].setValue(false);
    this.editGarageForm.addControl('cleaningRate', new FormControl());
    this.editGarageForm.controls['cleaningRate'].setValue('0');

    this.userService.user.subscribe((user) => {
      this.user = user;
    });

    if (this.user && this.user.role == 'ParkingManager') {
      this.userService
        .getParkingManager(this.user.id)
        .pipe(first())
        .subscribe((x) => {
          this.parkingManager = x;
          this.garageId = this.parkingManager.garageId;
          console.log(this.garageId);
          this.garageService
            .getById(this.garageId)
            .pipe()
            .subscribe((y) => {
              console.log(y);
              this.garage = y;
              this.hasCleaningServiceFlag = this.garage.hasCleaningService;
              this.initialCleaningRate(this.garage.hasCleaningService);
              console.log(this.garage.hasCleaningService);
              this.editGarageForm.patchValue(y);
            });
        });
    }

    // this.garageService
    //   .getById(this.parkingManager.garageId)
    //   .pipe(first())
    //   .subscribe((x) => this.editGarageForm.patchValue(x));

    // this.userService
    //   .getById(this.user.id)
    //   .pipe(first())
    //   .subscribe((x) => this.editUserForm.patchValue(x));
  }

  get f() {
    return this.editGarageForm.controls;
  }

  initialCleaningRate(fg: boolean): void {
    if (fg) {
      this.editGarageForm.controls['cleaningRate'].reset();
      this.editGarageForm.controls['cleaningRate'].setValidators([
        Validators.required
      ]);
    } else {
      this.editGarageForm.controls['cleaningRate'].setValue('0');
      this.editGarageForm.controls['cleaningRate'].clearValidators();
    }
  }

  updateCleaningRate(event: any): void {
    this.hasCleaningServiceFlag = event.checked;
    if (event.checked) {
      this.editGarageForm.controls['cleaningRate'].reset();
      this.editGarageForm.controls['cleaningRate'].setValidators([
        Validators.required
      ]);
    } else {
      this.editGarageForm.controls['cleaningRate'].setValue('0');
      this.editGarageForm.controls['cleaningRate'].clearValidators();
    }
  }

  onSubmit(): void {
    this.submitted = true;

    alert(JSON.stringify(this.editGarageForm.value));
    console.log(JSON.stringify(this.editGarageForm.value));

    this.garageService
      .update(this.editGarageForm.value, this.garageId)
      .pipe(first())
      .subscribe(
        () => {
          this._snackBar.open(`✓ Garage Edited`, '', {
            duration: 1500,
            horizontalPosition: 'right',
            verticalPosition: 'bottom'
          });
          this.router.navigate(['']);
        },
        (error) => {
          this._snackBar.open(`✗ Error ${error.error.message}`, '', {
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
    this.editGarageForm.reset();
  }
}
