import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CreateCategoryComponent} from './create-category/create-category.component';
import {EditCategoryComponent} from './edit-category/edit-category.component';
import {AdminCategoryComponent} from './admin-category.component';
import {AntModule} from '../../_shared/shared/ant.module';
import {ReactiveFormsModule} from '@angular/forms';
import {AdminRoutingCategoryModule} from './admin-routing-category.module';



@NgModule({
  declarations: [AdminCategoryComponent, CreateCategoryComponent, EditCategoryComponent],
  imports: [
    CommonModule,
    AntModule,
    ReactiveFormsModule,
    AdminRoutingCategoryModule
  ]
})
export class AdminCategoryModule { }
