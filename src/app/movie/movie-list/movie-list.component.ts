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
  listMovieAPI: any;
  loading = true;

  array = ['https://www.bollywoodhungama.com/wp-content/uploads/2019/08/War-1-5.jpg',
    'https://www.bollywoodhungama.com/wp-content/uploads/2019/08/War-1-5.jpg',
    'https://www.bollywoodhungama.com/wp-content/uploads/2019/08/War-1-5.jpg'];

  constructor(
    private movieService: MovieService,
    private activatedRoute: ActivatedRoute
  ) { }

  // custom layout from g-zorro
  gridStyle = {
    width: '20%',
    textAlign: 'center'
  };

  ngOnInit(): void {
    this.movieService.getCates().subscribe(data => {
      console.log(data);
      this.categories = data;
      this.loading = false;
    });
    this.activatedRoute.queryParamMap.subscribe(
      query => {
        const orderby = query.get('orderby');
      }
    );
  }

}
