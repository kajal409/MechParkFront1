import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from 'src/app/parking-manager/home/home.component';
import { CreateGarageComponent } from './create-garage/create-garage.component';
import { EditGarageComponent } from './edit-garage/edit-garage.component';
import { GarageComponent } from './garage/garage.component';
import { ParkingComponent } from './parking/parking.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: {
      title: 'Parking Manager'
    }
  },
  {
    path: 'garage',
    component: GarageComponent,
    data: {
      title: 'Parking Manager > Garage'
    }
  },
  {
    path: 'create-garage',
    component: CreateGarageComponent,
    data: {
      title: 'Parking Manager > Create Garage'
    }
  },
  {
    path: 'edit-garage',
    component: EditGarageComponent,
    data: {
      title: 'Parking Manager > Edit Garage'
    }
  },
  {
    path: 'parking',
    component: ParkingComponent,
    data: {
      title: 'Parking Manager > Parking'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParkingManagerRoutingModule {}
