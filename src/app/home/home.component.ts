import {Component, OnInit} from '@angular/core';
import {TokenService} from '../_services/token.service';
import {Router} from '@angular/router';
import {AuthService} from '../_services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isLoggedIn = false;

  constructor(
    private tokenService: TokenService,
    public authService: AuthService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenService.getToken();
    if (!this.isLoggedIn) {
      this.router.navigate(['home/login']);
    } else  {
      this.router.navigate(['home/movie']);
    }
  }

}
