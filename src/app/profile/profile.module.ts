import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import { RoutingProfileModule } from './routing-profile.module';
import {ChangePasswordComponent} from './change-password/change-password.component';
import {AntModule} from '../_shared/shared/ant.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { PaymentComponent } from './payment/payment.component';




@NgModule({
  declarations: [
    ProfileComponent,
    ProfileEditComponent,
    ChangePasswordComponent,
    PaymentComponent
  ],
  imports: [
    CommonModule,
    RoutingProfileModule,
    AntModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ProfileModule { }
