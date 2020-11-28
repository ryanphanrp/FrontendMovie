import { Component, OnInit } from '@angular/core';
import {TokenService} from '../_services/token.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.css']
})
export class LandingpageComponent implements OnInit {

  isLoggedIn = false;

  constructor(
    private tokenService: TokenService,
    private router: Router) {
  }

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.router.navigateByUrl('movie');
      this.isLoggedIn = true;
    }
  }

  // Redirect to login
  toLogin(): void {
    this.router.navigateByUrl('login');
  }

}
