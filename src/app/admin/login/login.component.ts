import {Component, Input, OnInit} from '@angular/core';
import {AdminService} from '../../_services/admin.service';
import {TokenService} from '../../_services/token.service';
import {NzNotificationService} from 'ng-zorro-antd/notification';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLoggedIn = false;
  validateForm!: FormGroup;
  @Input() isVisible = false;


  constructor(
    private adminService: AdminService,
    private tokenService: TokenService,
    private notification: NzNotificationService,
    private fb: FormBuilder,
    private router: Router) {
  }

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.isLoggedIn = true;
    }
    this.validateForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });
  }

  submitForm(): void {
    this.adminService.login(this.validateForm.value).subscribe(
      data => {
        // Token
        this.tokenService.saveToken(data.data.accessToken);
        this.tokenService.saveUser(data);

        // notification
        this.isLoggedIn = true;
        this.createNotification('success', 'SUCCESS', 'Login admin thanh cong.');
        this.router.navigate(['admin/movie']);
      },
      err => {
        this.createNotification('error', 'ERROR', err.error.message);
      }
    );
  }

  // Create Notification when submit
  createNotification(type: string, title: string, body: string): void {
    this.notification.create(type, title, body);
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

}
