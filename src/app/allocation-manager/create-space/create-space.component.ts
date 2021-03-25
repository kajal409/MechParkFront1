/* eslint-disable @typescript-eslint/no-unused-vars */
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

import { UserService } from 'src/app/_services/user.service';
import { SpaceService } from 'src/app/_services/space.service';
import { Router } from '@angular/router';
import { GarageService } from 'src/app/_services/garage.service';
import { User } from 'src/app/_models/user';
import { Garage } from 'src/app/_models/garage';

interface garageId {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-create-space',
  templateUrl: './create-space.component.html',
  styleUrls: ['./create-space.component.css']
})
export class CreateSpaceComponent implements OnInit {
  user: User;
  garages: Garage[];
  createSpaceForm: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private garageService: GarageService,
    private spaceService: SpaceService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createSpaceForm = this.formBuilder.group({
      code: this.formBuilder.control('', [Validators.required]),
      totalCapacity: this.formBuilder.control('', [
        Validators.required,
        Validators.pattern(/^[0-9]*$/)
      ]),
      garageId: this.formBuilder.control('', [Validators.required])
    });

    this.userService.user.subscribe((user) => {
      this.user = user;
    });

    this.garageService.getAll().subscribe((data) => {
      this.garages = data;
      // console.log(data);
    });
  }

  get f() {
    return this.createSpaceForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    alert(JSON.stringify(this.createSpaceForm.value));
    // console.log(JSON.stringify(this.createSpaceForm.value));

    this.spaceService
      .create(this.createSpaceForm.value)
      .pipe(first())
      .subscribe(
        (data) => {
          this._snackBar.open(`✓ Space Created`, '', {
            duration: 1500,
            horizontalPosition: 'right',
            verticalPosition: 'bottom'
          });
          this.router.navigate(['/allocationmanager/']);
        },
        (error) => {
          this._snackBar.open(`✗ Error ${error}`, '', {
            duration: 1500,
            horizontalPosition: 'right',
            verticalPosition: 'bottom'
          });
          this.onReset();
          // console.log(error);
        }
      );
  }

  onReset() {
    this.submitted = false;
    this.createSpaceForm.reset();
  }
}
