import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { first, map, startWith } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

import { UserService } from 'src/app/_services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/_models/user';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  id: number;
  user: User;
  editUserForm: FormGroup;
  submitted = false;

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
    private _snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.user = this.userService.userValue;
    this.editUserForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      city: ['Gujarat', Validators.required],
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

    this.userService
      .getById(this.id)
      .pipe(first())
      .subscribe((x) => this.editUserForm.patchValue(x));

    this.filteredStateOptions = this.editUserForm.controls[
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

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  get f() {
    return this.editUserForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.editUserForm.invalid) {
      return;
    }

    this.userService.update(this.editUserForm.value, this.id).subscribe(
      () => {
        this._snackBar.open('✓ Edited User', '', {
          duration: 1500,
          horizontalPosition: 'right',
          verticalPosition: 'bottom'
        });
        this.router.navigate(['/admin']);
      },
      (error) => {
        this._snackBar.open(`✗ Error ${error.error.message}`, '', {
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
    this.editUserForm.reset();
  }
}
