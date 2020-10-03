import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from 'src/app/_services/movie.service';
import { ICategory, IMovie } from 'src/app/_shared/movie';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {

  movieList: IMovie[];
  categories: ICategory[];

  constructor(
    private movieService: MovieService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.movieService.getCategories().subscribe(data => this.categories = data);
    this.activatedRoute.queryParamMap.subscribe(
      query => {
        const orderby = query.get('orderby');
      }
    )
  }

}
