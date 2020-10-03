import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// component
import { MovieRoutingModule } from './movie-routing.module';
import { MovieComponent } from './movie.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { MovieListComponent } from './movie-list/movie-list.component';


// Streaming Module
import { PlyrModule } from 'ngx-plyr';
import { MovieCategoryComponent } from './movie-category/movie-category.component';


@NgModule({
  declarations: [
    MovieComponent,
    MovieDetailComponent,
    MovieListComponent,
    MovieCategoryComponent
  ],
  imports: [
    CommonModule,
    MovieRoutingModule,
    PlyrModule
  ]
})
export class MovieModule { }
