import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateSpaceComponent } from 'src/app/allocation-manager/create-space/create-space.component';
import { EditSpaceComponent } from 'src/app/allocation-manager/edit-space/edit-space.component';
import { HomeComponent } from 'src/app/allocation-manager/home/home.component';
import { ParkingComponent } from 'src/app/allocation-manager/parking/parking.component';
import { SpaceComponent } from 'src/app/allocation-manager/space/space.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: {
      title: 'Allocation Manager'
    }
  },
  {
    path: 'space',
    component: SpaceComponent,
    data: {
      title: 'Allocation Manager > Space'
    }
  },
  {
    path: 'create-space',
    component: CreateSpaceComponent,
    data: {
      title: 'Allocation Manager > Create Space'
    }
  },
  {
    path: 'edit-space/:id',
    component: EditSpaceComponent,
    data: {
      title: 'Allocation Manager  > Edit Space'
    }
  },
  {
    path: 'parking',
    component: ParkingComponent,
    data: {
      title: 'Allocation Manager  > Parkings'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AllocationManagerRoutingModule {}
