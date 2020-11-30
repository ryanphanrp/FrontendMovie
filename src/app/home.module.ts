import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {NavbarComponent} from './navbar/navbar.component';
import {RegisterComponent} from './register/register.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AntModule} from './_shared/shared/ant.module';
import {HomeRoutingModule} from './home-routing.module';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import {authInterceptorProviders} from './_helpers/auth.interceptor';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';



@NgModule({
  declarations: [
    NavbarComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ResetPasswordComponent,
    ForgotpasswordComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AntModule,

    HomeRoutingModule
  ],
  providers: [authInterceptorProviders],
  exports: []
})
export class HomeModule { }
