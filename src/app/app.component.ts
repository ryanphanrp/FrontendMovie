import {Component} from '@angular/core';
import {AuthService} from './_services/auth.service';
import {TokenService} from './_services/token.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor() {
  }

  ngOnInit(): void {
  }

}
