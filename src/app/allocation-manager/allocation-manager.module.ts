import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AllocationManagerRoutingModule } from 'src/app/allocation-manager/allocation-manager-routing.module';
import { ParkingComponent } from 'src/app/allocation-manager/parking/parking.component';
import { SpaceComponent } from 'src/app/allocation-manager/space/space.component';
import { ParkinghistoryComponent } from 'src/app/allocation-manager/parkinghistory/parkinghistory.component';
import { HomeComponent } from 'src/app/allocation-manager/home/home.component';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from 'src/app/_services/user.service';
import { HttpProviderService } from 'src/app/_services/http-provider.service';
import { LocalService } from 'src/app/_services/local.service';
import { StorageService } from 'src/app/_services/storage.service';
import { GarageService } from 'src/app/_services/garage.service';
import { SpaceService } from 'src/app/_services/space.service';
import { ParkingService } from 'src/app/_services/parking.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from 'src/app/_helpers/jwt.interceptor';
import { ErrorInterceptor } from 'src/app/_helpers/error.interceptor';
import { CreateSpaceComponent } from './create-space/create-space.component';
import { EditSpaceComponent } from './edit-space/edit-space.component';

@NgModule({
  declarations: [
    ParkingComponent,
    SpaceComponent,
    ParkinghistoryComponent,
    HomeComponent,
    CreateSpaceComponent,
    EditSpaceComponent
  ],
  imports: [
    CommonModule,
    AllocationManagerRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    UserService,
    HttpProviderService,
    LocalService,
    StorageService,
    GarageService,
    SpaceService,
    ParkingService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    }
  ]
})
export class AllocationManagerModule {}
