import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AdminMovieComponent} from './admin-movie.component';
import {CreateMovieComponent} from './create-movie/create-movie.component';
import {EditMovieComponent} from './edit-movie/edit-movie.component';
import {AdminRoutingMovieModule} from './admin-routing-movie.module';
import {MatButtonModule} from '@angular/material/button';



@NgModule({
  declarations: [AdminMovieComponent, CreateMovieComponent, EditMovieComponent],
  imports: [
    CommonModule,
    AdminRoutingMovieModule,
    MatButtonModule
  ]
})
export class AdminMovieModule { }
