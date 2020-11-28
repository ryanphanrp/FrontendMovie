import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../_services/auth.service';
import {NzNotificationService} from 'ng-zorro-antd/notification';
import {Router} from '@angular/router';
import {TokenService} from '../_services/token.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  validateForm!: FormGroup;
  message: string;
  isLoggedIn = false;
  isVisible = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private tokenService: TokenService,
    private fb: FormBuilder,
    private notification: NzNotificationService) {
  }

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.isLoggedIn = true;
    }

    this.validateForm = this.fb.group({
      email: [
        '',
        [Validators.required, Validators.email]
      ],
      password: [
        '',
        [Validators.required, Validators.minLength(6)],
      ],
      // rememberMe: false,
    });
  }

  // Submit
  submitForm(): void {
    this.authService.login(this.validateForm.value).subscribe(
      data => {
        console.log(data);

        // Token
        this.tokenService.saveToken(data.data.accessToken);
        this.tokenService.saveUser(data);

        // notification
        this.isLoggedIn = true;
        this.authService.isAuthorized = true;
        this.createNotification('success', 'SUCCESS', 'Login thanh cong se tu dong chuyen huong');
        this.router.navigateByUrl('home/movie');
      },
      err => {
        this.createNotification('error', 'ERROR', err.error.message);
      }
    );
  }

  // logout
  logout(): void {
    this.tokenService.logOut();
    this.authService.isAuthorized = false;
    this.router.navigateByUrl('/');
  }

  // Create Notification when submit
  createNotification(type: string, title: string, body: string): void {
    this.notification.create(type, title, body);
  }

  // reset password
  showModal(): void {
    this.isVisible = true;
  }

}
