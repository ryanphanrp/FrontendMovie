import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import {AntModule} from '../_shared/shared/ant.module';
import {LoginComponent} from './login/login.component';
import {ReactiveFormsModule} from '@angular/forms';
import { AdminPaymentComponent } from './admin-payment/admin-payment.component';




@NgModule({
  declarations: [AdminComponent, LoginComponent, AdminPaymentComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    AntModule,
    ReactiveFormsModule,
  ]
})
export class AdminModule { }
