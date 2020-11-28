import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {NzNotificationService} from 'ng-zorro-antd/notification';
import {AuthService} from '../../_services/auth.service';
import {Router} from '@angular/router';
import {TokenService} from '../../_services/token.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  validateForm: FormGroup;
  @Input() isVisible = false;

  PASSWORD_PATTERN = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{0,}$/;

  // Constructor
  constructor(
    private fb: FormBuilder,
    public authService: AuthService,
    private tokenService: TokenService,
    private router: Router,
    private notification: NzNotificationService) {
  }


  // Submit
  submitForm(value: { password: string; confirm: string }): void {
    console.log(value);
    const payload = {
      token: this.tokenService.getToken(),
      password: value.password
    };
    this.authService.changePassword(payload).subscribe(
      data => {
        this.notification.create('success', 'SUCCESS', 'Change Password Successful!!!');
      },
      err => {
        this.notification.create('error', 'ERROR', err.error.message);
      }
    );
  }


  // Clear value in form
  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.validateForm.reset();
  }

  // Validate confirm password
  validateConfirmPassword(): void {
    setTimeout(() => this.validateForm.controls.confirm.updateValueAndValidity());
  }

  // Validate Password
  confirmValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return {error: true, required: true};
    } else if (control.value !== this.validateForm.controls.password.value) {
      return {error: true, confirm: true};
    }
    return {};
  }

  ngOnInit(): void {
    // create reactive form
    this.validateForm = this.fb.group({
      password: ['',
        [Validators.required, Validators.minLength(8), Validators.pattern(this.PASSWORD_PATTERN)]
      ],
      confirm: ['', [this.confirmValidator]]
    });
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }


}
