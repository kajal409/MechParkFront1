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

import { GarageService } from 'src/app/_services/garage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/_services/user.service';
import { Garage } from 'src/app/_models/garage';
import { ParkingManager } from 'src/app/_models/parkingManager';
import { User } from 'src/app/_models/user';

import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';

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

  stateOptions: string[] = [
    'Andhra Pradesh',
    'Arunachal Pradesh',
    'Assam',
    'Bihar',
    'Chhattisgarh',
    'Goa',
    'Gujarat',
    'Haryana',
    'Himachal Pradesh',
    'Jharkhand',
    'Karnataka',
    'Kerala',
    'Madhya Pradesh',
    'Maharashtra',
    'Manipur',
    'Meghalaya',
    'Mizoram',
    'Nagaland',
    'Odisha',
    'Punjab',
    'Rajasthan',
    'Sikkim',
    'Tamil Nadu',
    'Telangana',
    'Tripura',
    'Uttar Pradesh',
    'Uttarakhand',
    'West Bengal'
  ];

  filteredStateOptions: Observable<string[]>;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private garageService: GarageService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.garageId = this.route.snapshot.params['id'];
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

    this.garageService
      .getById(this.garageId)
      .pipe()
      .subscribe((y) => {
        this.garage = y;
        this.hasCleaningServiceFlag = this.garage.hasCleaningService;
        this.initialCleaningRate(this.garage.hasCleaningService);
        this.editGarageForm.patchValue(y);
      });

    this.filteredStateOptions = this.editGarageForm.controls[
      'state'
    ].valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.stateOptions.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
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
          this.router.navigate(['/admin']);
        },
        (error) => {
          this._snackBar.open(`✗ Error ${error}`, '', {
            duration: 1500,
            horizontalPosition: 'right',
            verticalPosition: 'bottom'
          });
          this.onReset();
        }
      );
  }

  onReset(): void {
    this.submitted = false;
    this.editGarageForm.reset();
  }
}
