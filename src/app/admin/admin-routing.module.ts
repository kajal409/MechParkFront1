import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UsersComponent } from 'src/app/admin/users/users.component';
import { SpacesComponent } from 'src/app/admin/spaces/spaces.component';
import { GaragesComponent } from 'src/app/admin/garages/garages.component';
import { ParkingsComponent } from 'src/app/admin/parkings/parkings.component';
import { ParkingHistoriesComponent } from 'src/app/admin/parking-histories/parking-histories.component';
import { HomeComponent } from 'src/app/admin/home/home.component';
import { EditUserComponent } from 'src/app/admin/edit-user/edit-user.component';
import { CreateUserComponent } from 'src/app/admin/create-user/create-user.component';
import { CreateGarageComponent } from 'src/app/admin/create-garage/create-garage.component';
import { EditGarageComponent } from 'src/app/admin/edit-garage/edit-garage.component';
import { CreateSpaceComponent } from 'src/app/admin/create-space/create-space.component';
import { EditSpaceComponent } from 'src/app/admin/edit-space/edit-space.component';

// import { AuthGuard } from 'src/app/_helpers/auth.guard';

const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: '/home',
  //   pathMatch: 'full'
  // },
  {
    path: '',
    component: HomeComponent,
    data: {
      title: 'Admin'
    }
  },
  {
    path: 'users',
    component: UsersComponent,
    data: {
      title: 'Admin > Users'
    }
  },
  {
    path: 'create-user',
    component: CreateUserComponent,
    data: {
      title: 'Admin > Create Users'
    }
  },
  {
    path: 'edit-user/:id',
    component: EditUserComponent,
    data: {
      title: 'Admin > Edit User'
    }
  },
  {
    path: 'garages',
    component: GaragesComponent,
    data: {
      title: 'Admin > Space'
    }
  },
  {
    path: 'create-garage',
    component: CreateGarageComponent,
    data: {
      title: 'Admin > Create Garage'
    }
  },
  {
    path: 'edit-garage/:id',
    component: EditGarageComponent,
    data: {
      title: 'Admin > Edit Garage'
    }
  },
  {
    path: 'spaces',
    component: SpacesComponent,
    data: {
      title: 'Admin > Space'
    }
  },
  {
    path: 'create-space',
    component: CreateSpaceComponent,
    data: {
      title: 'Admin > Create Space'
    }
  },
  {
    path: 'edit-space/:id',
    component: EditSpaceComponent,
    data: {
      title: 'Admin > Edit Space'
    }
  },
  {
    path: 'parkings',
    component: ParkingsComponent,
    data: {
      title: 'Admin > Parking'
    }
  },
  {
    path: 'parkinghistories',
    component: ParkingHistoriesComponent,
    data: {
      title: 'Admin > ParkingHistory'
    }
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
