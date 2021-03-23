import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
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
import { ParkingComponent } from './parking/parking.component';
import { ParkingHistoryComponent } from './parking-history/parking-history.component';
import { HomeComponent } from './home/home.component';
import { BookParkingComponent } from './book-parking/book-parking.component';

@NgModule({
  declarations: [
    ParkingComponent,
    ParkingHistoryComponent,
    HomeComponent,
    BookParkingComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
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
export class UserModule {}
