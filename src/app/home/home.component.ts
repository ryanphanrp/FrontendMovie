import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component,
  DoCheck,
  OnChanges,
  OnDestroy,
  OnInit
} from '@angular/core';
import {TokenService} from '../_services/token.service';
import {Router} from '@angular/router';
import {AuthService} from '../_services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, DoCheck {

  isLoggedIn = false;

  constructor(
    private tokenService: TokenService,
    public authService: AuthService,
    private router: Router) {
    this.isLoggedIn = !!this.tokenService.getToken();
    if (!this.tokenService.getToken()) {
      this.router.navigate(['/login']);
    }
  }

  ngOnInit(): void {
    console.log('ngOnInit - TINHTUTE');
    if (!this.isLoggedIn){
      this.router.navigate(['/login']);
    }
  }


  ngDoCheck(): void {
    if (this.tokenService.getToken()) {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }
  }

}
