import { Component } from '@angular/core';
import { AuthService } from './_services/auth.service';
import { TokenService } from './_services/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FEmovie - Angular';

  constructor(
    private authService: AuthService,
    private tokenService: TokenService,
  ) { }

  ngOnInit(): void {
    if(this.tokenService.getToken()){
      this.authService.isAuthorized = true;
    }
  }

}
