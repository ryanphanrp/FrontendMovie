import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

// component
import {AdminComponent} from './admin.component';
import {LoginComponent} from './login/login.component';
import {AuthGuard} from '../_guards/auth.guard';


const adminRoutes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'movie',
        loadChildren: () => import('./admin-movie/admin-movie.module').then(m => m.AdminMovieModule)
      },
      {
        path: 'user',
        loadChildren: () => import('./admin-user/admin-user.module').then(m => m.AdminUserModule)
      }
      ,
      {
        path: 'category',
        loadChildren: () => import('./admin-category/admin-category.module').then(m => m.AdminCategoryModule)
      }
    ]
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(adminRoutes)
  ],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
