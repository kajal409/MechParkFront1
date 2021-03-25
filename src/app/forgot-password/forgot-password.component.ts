import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../_services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    public userService: UserService,
    private _snackBar: MatSnackBar
  ) {}

  forgotPasswordForm: FormGroup;
  submitted = false;

  ngOnInit() {
    this.forgotPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  hide = true;

  // convenience getter for easy access to form fields
  get f() {
    return this.forgotPasswordForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.forgotPasswordForm.invalid) {
      return;
    }

    this.userService
      .forgotPassword(this.forgotPasswordForm.controls.email.value)
      .pipe()
      .subscribe(
        (user) => {
          this._snackBar.open('✓ Email has been send', '', {
            duration: 1500,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
            panelClass: 'snackbar-light-purple'
          });
        },
        (error) => {
          // console.log(error);
          this._snackBar.open(`✗ Incorrect email`, '', {
            duration: 1500,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
            panelClass: 'snackbar-light-red'
          });
          this.onReset();
          // console.log(error);
        },
        () => {
          // console.log('Here it goes');
        }
      );
  }

  onReset() {
    this.submitted = false;
    this.forgotPasswordForm.reset();
  }
}
