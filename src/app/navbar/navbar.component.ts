import {Component, Input, OnInit} from '@angular/core';
import {TokenService} from '../_services/token.service';
import {AuthService} from '../_services/auth.service';
import {Router} from '@angular/router';
import {MovieService} from '../_services/movie.service';
import {IMovie} from '../_shared/movie';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Input() isLogged: boolean;
  inputValue?: string;
  options: IMovie[] = [];

  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private movieService: MovieService,
    private router: Router) {
  }

  onChange(value: string): void {
    console.log(value);
    this.movieService.searchMovie(value).subscribe(
      data => {
        console.log('dataapi: ');
        console.log(data);
        this.options = data as [];
      }
    );
  }

  ngOnInit(): void {
  }

  // logout
  logout(): void {
    this.tokenService.logOut();
    window.location.reload();
  }
}
