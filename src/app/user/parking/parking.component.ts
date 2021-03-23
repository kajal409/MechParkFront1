import { Component, OnInit } from '@angular/core';
import { Garage } from 'src/app/_models/garage';
import { Parking } from 'src/app/_models/parking';
import { Space } from 'src/app/_models/space';
import { User } from 'src/app/_models/user';
import { GarageService } from 'src/app/_services/garage.service';
import { ParkingService } from 'src/app/_services/parking.service';
import { SpaceService } from 'src/app/_services/space.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-parking',
  templateUrl: './parking.component.html',
  styleUrls: ['./parking.component.css']
})
export class ParkingComponent implements OnInit {
  user: User;
  userInfo: User;
  parking: Parking;
  garage: Garage;
  space: Space;

  constructor(
    private userService: UserService,
    private parkingService: ParkingService,
    private spaceService: SpaceService,
    private garageService: GarageService
  ) {}

  ngOnInit(): void {
    this.userService.user.subscribe((user) => {
      this.user = user;
      this.userService.getById(this.user.id).subscribe((userInfo) => {
        this.userInfo = userInfo;
      });
    });

    this.parkingService
      .getByUser(this.user.id)
      .pipe()
      .subscribe((parking) => {
        this.parking = parking;
        this.garageService
          .getById(this.parking.garageId)
          .subscribe((garage) => {
            this.garage = garage;
          });
      });
  }
}
