import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ParkingComponent } from './parking/parking.component';
import { ParkingHistoryComponent } from './parking-history/parking-history.component';
import { HomeComponent } from './home/home.component';
import { BookParkingComponent } from './book-parking/book-parking.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: {
      title: 'User'
    }
  },
  {
    path: 'book-parking',
    component: BookParkingComponent,
    data: {
      title: 'Book Parking'
    }
  },
  {
    path: '',
    component: ParkingComponent,
    data: {
      title: 'User Parking'
    }
  },
  {
    path: '',
    component: ParkingHistoryComponent,
    data: {
      title: 'User Parking History'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
