import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParkingManagerRoutingModule } from './parking-manager-routing.module';
import { HomeComponent } from './home/home.component';

import { MaterialModule } from 'src/app/material.module';
import { UserService } from 'src/app/_services/user.service';
import { GarageService } from 'src/app/_services/garage.service';
import { HttpProviderService } from 'src/app/_services/http-provider.service';
import { SpaceService } from 'src/app/_services/space.service';
import { ParkingService } from 'src/app/_services/parking.service';
import { LocalService } from 'src/app/_services/local.service';
import { StorageService } from 'src/app/_services/storage.service';
import { JwtInterceptor } from 'src/app/_helpers/jwt.interceptor';
import { ErrorInterceptor } from 'src/app/_helpers/error.interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { GarageComponent } from './garage/garage.component';
import { CreateGarageComponent } from './create-garage/create-garage.component';
import { EditGarageComponent } from './edit-garage/edit-garage.component';
import { ParkingComponent } from './parking/parking.component';
import { ParkinghistoryComponent } from './parkinghistory/parkinghistory.component';

@NgModule({
  declarations: [
    HomeComponent,
    GarageComponent,
    CreateGarageComponent,
    EditGarageComponent,
    ParkingComponent,
    ParkinghistoryComponent
  ],
  imports: [
    CommonModule,
    ParkingManagerRoutingModule,
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
export class ParkingManagerModule {}
