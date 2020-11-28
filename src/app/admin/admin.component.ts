import {Component, OnInit} from '@angular/core';
import {TokenService} from '../_services/token.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  isLogged = false;

  constructor(
    private tokenService: TokenService,
    private router: Router) {
  }

  ngOnInit(): void {
    if (!this.tokenService.getToken()) {
      this.router.navigate(['admin/login']);
    }
  }

  login(): void {
    this.isLogged = true;
    this.router.navigate(['admin/login']);
  }

  logout(): void {
    this.isLogged = false;
    this.tokenService.logOut();
    window.location.reload();
  }


}
