import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { ProfileDetailComponent } from './profile-detail/profile-detail.component';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import { RoutingProfileModule } from './routing-profile.module';



@NgModule({
  declarations: [
    ProfileComponent,
    ProfileDetailComponent,
    ProfileEditComponent
  ],
  imports: [
    CommonModule,
    RoutingProfileModule
  ]
})
export class ProfileModule { }
