/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

import { MustMatch } from 'src/app/_helpers/must-match.validator';

import { UserService } from 'src/app/_services/user.service';
import { Router } from '@angular/router';
import { RegisterRole } from 'src/app/_models/registerRole';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  isUnchanged = true;
  createUserForm: FormGroup;
  submitted = false;
  roles: RegisterRole[] = [
    { value: 'AllocationManager', viewValue: 'Allocation Manager' },
    { value: 'ParkingManager', viewValue: 'Parking Manager' },
    { value: 'User', viewValue: 'Customer' }
  ];
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
    public userService: UserService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit() {
    this.createUserForm = this.formBuilder.group(
      {
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        address: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
        phone: [
          '',
          [
            Validators.required,
            Validators.pattern(/^[0-9]*$/),
            Validators.minLength(10)
          ]
        ],
        role: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required]
      },
      {
        validator: MustMatch('password', 'confirmPassword')
      }
    );

    this.filteredStateOptions = this.createUserForm.controls[
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

  hide = true;

  get f() {
    return this.createUserForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.createUserForm.invalid) {
      return;
    }

    this.userService
      .register(this.createUserForm.value)
      .pipe(first())
      .subscribe(
        (data) => {
          this._snackBar.open('✓ User Created', '', {
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

  onReset() {
    this.submitted = false;
    this.createUserForm.reset();
  }
}
