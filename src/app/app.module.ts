import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { SignupComponent } from './signup/signup.component';
import { RegisterComponent } from './register/register.component';

// Services
import { UserService } from 'src/app/_services/user.service';
import { GarageService } from 'src/app/_services/garage.service';
import { SpaceService } from 'src/app/_services/space.service';
import { ParkingService } from 'src/app/_services/parking.service';
import { LocalService } from 'src/app/_services/local.service';
import { StorageService } from 'src/app/_services/storage.service';

// Material Module
import { MaterialModule } from 'src/app/material.module';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { HttpProviderService } from './_services/http-provider.service';
import { EditUserComponent } from './edit-user/edit-user.component';

import { JwtInterceptor } from './_helpers/jwt.interceptor';

import { CreateGarageComponent } from './create-garage/create-garage.component';
import { EditGarageComponent } from './edit-garage/edit-garage.component';
import { CreateSpaceComponent } from './create-space/create-space.component';
import { EditSpaceComponent } from './edit-space/edit-space.component';
import { BookParkingComponent } from './book-parking/book-parking.component';
import { ErrorInterceptor } from './_helpers/error.interceptor';
import { ReceiptComponent } from './receipt/receipt.component';
import { Error404Component } from './error404/error404.component';
// import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
// import { ParkingmanagerComponent } from './parkingmanager/parkingmanager.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    ForgotPasswordComponent,
    SignupComponent,
    RegisterComponent,
    EditUserComponent,
    CreateGarageComponent,
    EditGarageComponent,
    CreateSpaceComponent,
    EditSpaceComponent,
    BookParkingComponent,
    ReceiptComponent,
    Error404Component
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    LoadingBarRouterModule,
    HttpClientModule
  ],
  providers: [
    Title,
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
    // {
    //   provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
    //   useValue: { floatLabel: 'always' }
    // }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
