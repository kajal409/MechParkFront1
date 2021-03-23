import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AdminRoutingModule } from './admin-routing.module';
import { UsersComponent } from './users/users.component';
import { SpacesComponent } from './spaces/spaces.component';
import { GaragesComponent } from './garages/garages.component';
import { ParkingsComponent } from './parkings/parkings.component';
import { ParkingHistoriesComponent } from './parking-histories/parking-histories.component';
import { HomeComponent } from './home/home.component';
import { MaterialModule } from 'src/app/material.module';

// Services
import { UserService } from 'src/app/_services/user.service';
import { GarageService } from 'src/app/_services/garage.service';
import { HttpProviderService } from 'src/app/_services/http-provider.service';
import { SpaceService } from 'src/app/_services/space.service';
import { ParkingService } from 'src/app/_services/parking.service';
import { LocalService } from 'src/app/_services/local.service';
import { StorageService } from 'src/app/_services/storage.service';
import { JwtInterceptor } from 'src/app/_helpers/jwt.interceptor';
import { ErrorInterceptor } from 'src/app/_helpers/error.interceptor';
import { EditUserComponent } from './edit-user/edit-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateUserComponent } from './create-user/create-user.component';
import { CreateSpaceComponent } from './create-space/create-space.component';
import { EditSpaceComponent } from './edit-space/edit-space.component';
import { CreateGarageComponent } from './create-garage/create-garage.component';
import { EditGarageComponent } from './edit-garage/edit-garage.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    UsersComponent,
    SpacesComponent,
    GaragesComponent,
    ParkingsComponent,
    ParkingHistoriesComponent,
    HomeComponent,
    EditUserComponent,
    CreateUserComponent,
    CreateSpaceComponent,
    EditSpaceComponent,
    CreateGarageComponent,
    EditGarageComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
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
export class AdminModule {}
