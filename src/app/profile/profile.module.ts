import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { ProfileDetailComponent } from './profile-detail/profile-detail.component';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import { RoutingProfileModule } from './routing-profile.module';
import {ChangePasswordComponent} from './change-password/change-password.component';
import {AntModule} from '../_shared/shared/ant.module';
import {ReactiveFormsModule} from '@angular/forms';



@NgModule({
  declarations: [
    ProfileComponent,
    ProfileDetailComponent,
    ProfileEditComponent,
    ChangePasswordComponent
  ],
  imports: [
    CommonModule,
    RoutingProfileModule,
    AntModule,
    ReactiveFormsModule
  ]
})
export class ProfileModule { }
