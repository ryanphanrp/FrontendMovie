import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Router, RouterModule, Routes} from '@angular/router';
import {AdminMovieComponent} from './admin-movie.component';
import {CreateMovieComponent} from './create-movie/create-movie.component';
import {EditMovieComponent} from './edit-movie/edit-movie.component';


const routes: Routes = [
  {
    path: '',
    component: AdminMovieComponent,
    children: [
      {
        path: 'create',
        component: CreateMovieComponent
      },
      {
        path: 'edit',
        component: EditMovieComponent
      }
    ]
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AdminRoutingMovieModule { }
