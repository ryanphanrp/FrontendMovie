import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { MatButtonModule } from '@angular/material/button';
import {MatGridListModule} from '@angular/material/grid-list';




@NgModule({
  declarations: [ AdminComponent ],
    imports: [
        CommonModule,
        AdminRoutingModule,
        MatButtonModule,
        MatGridListModule,
    ]
})
export class AdminModule { }
