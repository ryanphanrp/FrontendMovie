import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';

import { AdminUserComponent } from './admin-user.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';


const routes: Routes = [
  {
    path: '',
    component: AdminUserComponent,
    children: [
      {
        path: 'create',
        component: CreateUserComponent
      },
      {
        path: 'edit',
        component: EditUserComponent
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
export class AdminRoutingUserModule { }
