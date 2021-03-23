/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

import { MustMatch } from '../_helpers/must-match.validator';

import { UserService } from '../_services/user.service';
import { Router } from '@angular/router';
import { User } from '../_models/user';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  user: User;
  editUserForm: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.user = this.userService.userValue;
    console.log(this.user);
    this.editUserForm = this.formBuilder.group({
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
          Validators.minLength(10),
          Validators.maxLength(10)
        ]
      ]
    });

    console.log(this.user.id);

    this.userService
      .getById(this.user.id)
      .pipe(first())
      .subscribe((x) => this.editUserForm.patchValue(x));
  }

  hide = true;

  get f() {
    return this.editUserForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.editUserForm.invalid) {
      return;
    }

    alert(JSON.stringify(this.editUserForm.value));

    this.userService
      .update(this.editUserForm.value, this.user.id)
      .pipe(first())
      .subscribe(
        (data) => {
          this._snackBar.open('✓ Edited', '', {
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

  onReset() {
    this.submitted = false;
    this.editUserForm.reset();
  }
}
