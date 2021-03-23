/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { ChangeDetectorRef } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { GarageService } from 'src/app/_services/garage.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-create-garage',
  templateUrl: './create-garage.component.html',
  styleUrls: ['./create-garage.component.css']
})
export class CreateGarageComponent implements OnInit {
  createGarageForm: FormGroup;
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
    private garageService: GarageService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.createGarageForm = this.formBuilder.group({
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

    this.createGarageForm.controls['hasCleaningService'].setValue(false);
    this.createGarageForm.addControl('cleaningRate', new FormControl());
    this.createGarageForm.controls['cleaningRate'].setValue('0');

    this.filteredStateOptions = this.createGarageForm.controls[
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
    return this.createGarageForm.controls;
  }

  updateCleaningRate(event: any): void {
    this.hasCleaningServiceFlag = event.checked;
    if (event.checked) {
      // this.createGarageForm.addControl('cleaningRate', new FormControl());
      this.createGarageForm.controls['cleaningRate'].reset();
      this.createGarageForm.controls['cleaningRate'].setValidators([
        Validators.required,
        Validators.pattern(/^[0-9]*$/)
      ]);
    } else {
      this.createGarageForm.controls['cleaningRate'].setValue('0');
      // this.createGarageForm.removeControl('cleaningRate');
    }
  }

  onSubmit(): void {
    this.submitted = true;

    alert(JSON.stringify(this.createGarageForm.value));

    this.garageService.create(this.createGarageForm.value).subscribe(
      () => {
        this._snackBar.open(`✓ Garage Created`, '', {
          duration: 1500,
          horizontalPosition: 'right',
          verticalPosition: 'bottom'
        });
        this.router.navigate(['/parkingmanager']);
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
    // this.createGarageForm.reset();
  }

  ngAfterViewChecked(): void {
    this.cdRef.detectChanges();
  }
}
