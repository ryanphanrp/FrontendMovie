import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {map} from 'rxjs/operators';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../_services/auth.service';
import {NzNotificationService} from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {

  token: string;

  isVisible = true;
  validateForm: FormGroup;
  PASSWORD_PATTERN = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{0,}$/;

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    public authService: AuthService,
    private router: Router,
    private notification: NzNotificationService) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.pipe(
      map(pramas => pramas.get('token'))
    ).subscribe(
      data => this.token = data,
      error => console.log(error.message)
    );
    this.validateForm = this.fb.group({
      password: ['',
        [Validators.required, Validators.minLength(8), Validators.pattern(this.PASSWORD_PATTERN)]
      ],
      confirm: ['', [this.confirmValidator]]
    });
  }

  // Submit
  submitForm(value: { password: string; confirm: string }): void {
    const payload = {
      token: this.token,
      password: value.password
    };
    this.authService.newPassword(payload).subscribe(
      data => {
        this.notification.create('success', 'SUCCESS', 'Reset Password Successful!!!');
        this.router.navigate(['/login']);
      },
      err => {
        this.notification.create('error', 'ERROR', err.error.message);
      }
    );
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

  // Validate confirm password
  validateConfirmPassword(): void {
    setTimeout(() => this.validateForm.controls.confirm.updateValueAndValidity());
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

}
