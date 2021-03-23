/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { User } from '../_models/user';
import { ParkingHistory } from '../_models/parkingHistory';
// import { HttpProviderService } from '../_services/http-provider.service';
import { UserService } from 'src/app/_services/user.service';
import { ParkingService } from 'src/app/_services/parking.service';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.css']
})
export class ReceiptComponent implements OnInit {
  user: User;
  userInfo: User;
  receipt: any;
  date: Date;
  formatDate: any;
  constructor(
    private userService: UserService,
    private parkingService: ParkingService
  ) {}

  ngOnInit(): void {
    this.userService.user.subscribe((user: User) => {
      this.user = user;
      if (user == null) {
      } else {
        this.userService
          .getById(this.user.id)
          .pipe(first())
          .subscribe((userInfo: User) => {
            this.userInfo = userInfo;
          });
      }
    });

    this.parkingService.receipt().subscribe((x: ParkingHistory) => {
      this.receipt = x;
      const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      };
      this.date = this.receipt.userCheckOut;
      this.formatDate = this.date;
      console.log(
        '🚀 ~ file: receipt.component.ts ~ line 54 ~ ReceiptComponent ~ this.parkingService.receipt ~ formatDate',
        this.formatDate
      );
      console.log(
        '🚀 ~ file: receipt.component.ts ~ line 45 ~ ReceiptComponent ~ this.parkingService.receipt ~ x',
        x
      );
    });
  }
}
