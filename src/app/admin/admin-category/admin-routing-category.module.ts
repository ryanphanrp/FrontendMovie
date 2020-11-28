import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';

import {AdminCategoryComponent} from './admin-category.component';
import {CreateCategoryComponent} from './create-category/create-category.component';
import {EditCategoryComponent} from './edit-category/edit-category.component';

const routes: Routes = [
  {
    path: '',
    component: AdminCategoryComponent,
    children: [
      {
        path: 'create',
        component: CreateCategoryComponent
      },
      {
        path: 'edit',
        component: EditCategoryComponent
      }
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AdminRoutingCategoryModule { }
