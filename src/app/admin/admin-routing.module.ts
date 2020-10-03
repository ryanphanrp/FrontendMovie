import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

// component
import { AdminComponent } from './admin.component';
import { LoginComponent } from './login/login.component';
import {importExpr} from '@angular/compiler/src/output/output_ast';


const adminRoutes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'movie',
        loadChildren: () => import('./admin-movie/admin-movie.module').then(m => m.AdminMovieModule)
      },
      {
        path: 'user',
        loadChildren: () => import('./admin-user/admin-user.module').then(m => m.AdminUserModule)
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(adminRoutes)
  ],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
