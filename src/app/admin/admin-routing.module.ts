import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

// component
import {AdminComponent} from './admin.component';
import {LoginComponent} from './login/login.component';
import {AuthGuard} from '../_guards/auth.guard';
import {AdminPaymentComponent} from './admin-payment/admin-payment.component';


const adminRoutes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'movie',
        canActivate: [AuthGuard],
        loadChildren: () => import('./admin-movie/admin-movie.module').then(m => m.AdminMovieModule)
      },
      {
        path: 'user',
        canActivate: [AuthGuard],
        loadChildren: () => import('./admin-user/admin-user.module').then(m => m.AdminUserModule)
      },
      {
        path: 'category',
        canActivate: [AuthGuard],
        loadChildren: () => import('./admin-category/admin-category.module').then(m => m.AdminCategoryModule)
      },
      {
        path: 'payment',
        canActivate: [AuthGuard],
        component: AdminPaymentComponent
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
