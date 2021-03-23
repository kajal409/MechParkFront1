/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnInit, ViewChild } from '@angular/core';
import { ParkingService } from 'src/app/_services/parking.service';
import { Parking } from 'src/app/_models/parking';
import {
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SpaceService } from 'src/app/_services/space.service';
import { Space } from 'src/app/_models/space';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-parkings',
  templateUrl: './parkings.component.html',
  styleUrls: ['./parkings.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      )
    ])
  ]
})
export class ParkingsComponent implements OnInit {
  parkings: Parking[];
  parkingSource: MatTableDataSource<Parking>;
  expandedElement: Parking | null;
  parkingColumnsToDisplay = [
    'vehicleNumber',
    'driverName',
    'isActive',
    'spaceCode'
  ];
  spaces: Space[] = [];
  value: '';

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private parkingService: ParkingService,
    private spaceService: SpaceService,
    private _snackBar: MatSnackBar
  ) {}

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.parkingSource.filter = filterValue.trim().toLowerCase();

    if (this.parkingSource.paginator) {
      this.parkingSource.paginator.firstPage();
    }
  }

  ngOnInit(): void {
    this.parkingService.getAll().subscribe((parkings: Parking[]) => {
      this.parkings = parkings;
      this.parkingSource = new MatTableDataSource<Parking>(this.parkings);
      this.parkingSource.sort = this.sort;
      for (let i = 0; i < parkings.length; i++) {
        this.spaceService
          .getById(this.parkings[i].spaceId)
          .subscribe((space) => {
            this.spaces.push(space);
            this.parkingSource.paginator = this.paginator;
          });
      }
    });
  }
}
