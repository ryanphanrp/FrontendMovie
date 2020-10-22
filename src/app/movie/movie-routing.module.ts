import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MovieComponent } from './movie.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { MovieListComponent } from './movie-list/movie-list.component';
import { MovieCategoryComponent } from './movie-category/movie-category.component';


const movieRoutes: Routes = [
  {
    path: '',
    component: MovieComponent,
    children: [
      {
        path: '',
        component: MovieListComponent
      },
      {
        path: ':name',
        component: MovieCategoryComponent
      },
      {
        path: ':name/:slug',
        component: MovieDetailComponent
      }

    ]

  }
];


@NgModule({
  imports: [
    RouterModule.forChild(movieRoutes)
  ],
  exports: [RouterModule]
})
export class MovieRoutingModule { }
