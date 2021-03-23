/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from '@angular/forms';
import { first } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

import { UserService } from '../_services/user.service';
import { SpaceService } from '../_services/space.service';
import { Router } from '@angular/router';
import { GarageService } from '../_services/garage.service';
import { Space } from '../_models/space';

@Component({
  selector: 'app-edit-space',
  templateUrl: './edit-space.component.html',
  styleUrls: ['./edit-space.component.css']
})
export class EditSpaceComponent implements OnInit {
  id: number;
  space: Space;
  editSpaceForm: FormGroup;
  submitted = false;
  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private garageService: GarageService,
    private spaceService: SpaceService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.spaceService.getById(this.id).subscribe((x) => {
      this.space = x;
      console.log(x);
    });
    this.editSpaceForm = this.formBuilder.group({
      code: this.formBuilder.control('', [Validators.required]),
      totalCapacity: this.formBuilder.control('', [
        Validators.required,
        Validators.pattern(/^[0-9]*$/)
      ])
    });

    this.spaceService
      .getById(this.id)
      .pipe(first())
      .subscribe((x) => {
        this.space = x;
        this.editSpaceForm.patchValue(x);
      });
  }

  get f() {
    return this.editSpaceForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    this.spaceService
      .update(this.editSpaceForm.value, this.id)
      .pipe(first())
      .subscribe(
        (data) => {
          this._snackBar.open(`✓ Space Edited`, '', {
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
    this.editSpaceForm.reset();
  }
}
