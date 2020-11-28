import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../_services/auth.service';
import {NzNotificationService} from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  validateForm: FormGroup;
  @Input() isVisible = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private notification: NzNotificationService) {
  }

  submitForm(value: { email: string }): void {
    this.authService.resetPassword(value).subscribe(
      data => {
        this.notification.create('success', 'SUCCESS', 'Please Check your mail!!!');
      },
      err => {
        this.notification.create('error', 'ERROR', err.error.message);
      }
    );
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
    });
  }

}
