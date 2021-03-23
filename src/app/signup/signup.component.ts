/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { first, map, startWith } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

import { MustMatch } from '../_helpers/must-match.validator';

import { UserService } from '../_services/user.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  submitted = false;
  cityOptions: string[] = ['Ahmedabad', 'Rajkot'];
  filteredCityOptions: Observable<string[]>;

  constructor(
    private formBuilder: FormBuilder,
    public userService: UserService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit() {
    this.signupForm = this.formBuilder.group(
      {
        Name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        address: ['', Validators.required],
        city: ['', Validators.required],
        state: ['Gujarat', Validators.required],
        phone: [
          '',
          [
            Validators.required,
            Validators.pattern(/^[0-9]*$/),
            Validators.minLength(10)
          ]
        ],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required]
      },
      {
        validator: MustMatch('password', 'confirmPassword')
      }
    );

    this.filteredCityOptions = this.signupForm.controls[
      'state'
    ].valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.cityOptions.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  hide = true;

  get f() {
    return this.signupForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.signupForm.invalid) {
      return;
    }

    this.userService
      .register(this.signupForm.value)
      .pipe(first())
      .subscribe(
        (data) => {
          this._snackBar.open('✓ Signed Up', '', {
            duration: 1500,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
            panelClass: 'snackbar-light-purple'
          });
          this.router.navigate(['/login']);
        },
        (error) => {
          this._snackBar.open(`✗ Error ${error}`, '', {
            duration: 1500,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
            panelClass: 'snackbar-light-red'
          });
          this.onReset();
          console.log(error);
        }
      );
  }

  onReset() {
    this.submitted = false;
    this.signupForm.reset();
  }
}
