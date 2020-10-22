import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../_services/auth.service';
import { TokenService } from '../_services/token.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: any = {};
  isLoggedIn = false;
  isLoggedFailed = false;
  failed_message = '';


  // forms
  hide = true;
  passwordPattern = /^(?=.*[!@#$%^&*]+)[a-zA-Z0-9!@#$%^&*]$/;


  constructor(
    private authService: AuthService,
    private tokenService: TokenService,
    private snackBar: MatSnackBar
  ) { }


  ngOnInit(): void {
    if (this.tokenService.getToken()){
      this.isLoggedIn = true;
    }
  }


  onSubmit(): void {
    this.authService.login(this.user).subscribe(
      data => {
        this.tokenService.saveToken(data.data.accessToken);
        this.tokenService.saveUser(data);

        // for templates
        this.isLoggedIn = true;
        this.authService.isAuthorized = true;
        this.isLoggedFailed = false;
        // this.reloadPage();
      },
      error => {
        this.isLoggedFailed = true;
        this.failed_message = error.error.message;
        this.openSnackBar(this.failed_message);
      }
    );
  }


  // logout
  logout(): void {
    this.isLoggedIn = false;
    this.tokenService.logOut();
    window.location.reload();
  }


  // reload Page
  reloadPage(): void {
    window.location.reload();
  }


  // snackBar
  openSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}
