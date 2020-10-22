import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {map, switchMap} from 'rxjs/operators';
import {MovieService} from 'src/app/_services/movie.service';
import {IMovie} from 'src/app/_shared/movie';


let Plyr = require('plyr');
declare var require: any;


@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {

  public movie: IMovie;
  public player;


  constructor(
    private movieService: MovieService,
    private activatedRoute: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.pipe(
      map(pramas => pramas.get('slug')),
      switchMap(slug => this.movieService.findMovieBySlug(slug))
    ).subscribe(item => this.movie = item);

    // player
    this.player = new Plyr('#plyrID', {
      captions: {active: true},
      controls: [
        'play-large', // The large play button in the center
        'restart', // Restart playback
        'rewind', // Rewind by the seek time (default 10 seconds)
        'play', // Play/pause playback
        'fast-forward', // Fast forward by the seek time (default 10 seconds)
        'progress', // The progress bar and scrubber for playback and buffering
        'current-time', // The current time of playback
        'duration', // The full duration of the media
        'mute', // Toggle mute
        'volume', // Volume control
        'captions', // Toggle captions
        'settings', // Settings menu
        'pip', // Picture-in-picture (currently Safari only)
        'airplay', // Airplay (currently Safari only)
        'download', // Show a download button with a link to either the current source or a custom URL you specify in your options
        'fullscreen' // Toggle fullscreen
      ]
    });
  }

}
