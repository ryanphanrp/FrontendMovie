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
export class HomeComponent implements OnInit, DoCheck, AfterViewInit,
  AfterContentInit, AfterContentChecked, AfterViewChecked, OnDestroy, OnChanges {

  isLoggedIn = false;

  constructor(
    private tokenService: TokenService,
    public authService: AuthService,
    private router: Router) {
    this.isLoggedIn = !!this.tokenService.getToken();
    if (!this.tokenService.getToken()) {
      this.router.navigate(['/login']);
    }else{
      this.router.navigate(['/movie']);
    }
  }

  ngOnInit(): void {
    console.log('ngOnInit - TINHTUTE');
    if (this.tokenService.getToken()) {
      this.router.navigate(['/movie']);
    }
    if (!this.isLoggedIn){
      this.router.navigate(['/login']);
    }
  }

  ngAfterViewInit(): void {
    console.log('ngAfterViewInit - TINHTUTE');
  }

  ngOnChanges(): void {
    console.log('ngDoCheck - TINHTUTE');
  }


  ngDoCheck(): void {
    console.log('ngDoCheck - -------------------------------');
    if (this.tokenService.getToken()) {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }
  }

  ngAfterContentInit(): void {
    console.log('ngAfterContentInit - ***************************************');
  }

  ngAfterContentChecked(): void {
    console.log('ngAfterContentChecked - -------------------------------');
  }

  ngAfterViewChecked(): void {
    console.log('ngAfterViewChecked - ----------------------------');
  }

  ngOnDestroy(): void {
    console.log('ngOnDestroy - TINHTUTE');
  }

}
