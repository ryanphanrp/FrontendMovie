import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

// component
import {MovieRoutingModule} from './movie-routing.module';
import {MovieComponent} from './movie.component';
import {MovieDetailComponent} from './movie-detail/movie-detail.component';
import {MovieListComponent} from './movie-list/movie-list.component';


// Streaming Module
import {PlyrModule} from 'ngx-plyr';
import {MovieCategoryComponent} from './movie-category/movie-category.component';
import {AntModule} from '../_shared/shared/ant.module';
import { CommentComponent } from './comment/comment.component';
import {FormsModule} from '@angular/forms';



@NgModule({
  declarations: [
    MovieComponent,
    MovieDetailComponent,
    MovieListComponent,
    MovieCategoryComponent,
    CommentComponent
  ],
    imports: [
        CommonModule,
        MovieRoutingModule,
        PlyrModule,
        AntModule,
        FormsModule
    ]
})
export class MovieModule {
}
