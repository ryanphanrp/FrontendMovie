import {Component, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PlyrComponent} from 'ngx-plyr';
import {map, switchMap} from 'rxjs/operators';
import {MovieService} from 'src/app/_services/movie.service';
import * as Plyr from 'plyr';
import {IMovie} from 'src/app/_shared/movie';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {

  public movie: IMovie;


  // get the component instance to have access to plyr instance
  @ViewChild(PlyrComponent)
  plyr: PlyrComponent;


// or get it from plyrInit event
  player: Plyr;

  options: Plyr.Options = {
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
      'fullscreen', // Toggle fullscreen
    ]
  };


  videoSources: Plyr.Source[] = [
      {
        // src: this.movie.source,
        src: "https://jbie.cloud/0:/Movies/Chau%20Tinh%20Tri/16.%20Royal%20Tramp%20I%201992%20ViE%20mHD%20Bluray%20DD5.1%20x264-EPiK.mkv",
        type: 'video/mp4',
        size: 1080,
      },
    ];

  constructor(
    private movieService: MovieService,
    private activatedRoute: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.pipe(
      map(pramas => pramas.get('slug')),
      switchMap(slug => this.movieService.findMovieByID(slug))
    ).subscribe(item => this.movie = item);
  }

  played(event: Plyr.PlyrEvent) {
    console.log('played', event);
  }

  play(): void {
    this.player.play(); // or this.plyr.player.play()
  }

}
