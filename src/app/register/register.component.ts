import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {Observable, Observer} from 'rxjs';
import {AuthService} from '../_services/auth.service';
import {TokenService} from '../_services/token.service';
import {Router} from '@angular/router';
import {NzNotificationService} from 'ng-zorro-antd/notification';
import {UserService} from '../_services/user.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  validateForm: FormGroup;

  PASSWORD_PATTERN = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{0,}$/;

  // Constructor
  constructor(
    private fb: FormBuilder,
    public authService: AuthService,
    private tokenService: TokenService,
    private router: Router,
    private notification: NzNotificationService) {
    // create reactive form
    this.validateForm = this.fb.group({
      nickname: ['',
        [Validators.required]
      ],
      email: ['',
        [Validators.email, Validators.required],
        [this.emailAsyncValidator]
      ],
      password: ['',
        [Validators.required, Validators.minLength(8), Validators.pattern(this.PASSWORD_PATTERN)]
      ],
      confirm: ['', [this.confirmValidator]]
    });
  }


  // Submit
  submitForm(value: { nickname: string; email: string; password: string; confirm: string }): void {
    this.authService.register(value).subscribe(
      data => {
        this.notification.create('success', 'SUCCESS', 'Register Successful!!!');
        this.router.navigate(['/login']);
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


  // Validate Email and check email if existed
  emailAsyncValidator = (control: FormControl) =>
    new Observable((observer: Observer<ValidationErrors | null>) => {
      setTimeout(() => {
        if (control.value === 'anh4bi@gmail.com') {
          // you have to return `{error: true}` to mark it as an error event
          observer.next({error: true, duplicated: true});
        } else {
          observer.next(null);
        }
        observer.complete();
      }, 100);
    })


  // Validate Password
  confirmValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return {error: true, required: true};
    } else if (control.value !== this.validateForm.controls.password.value) {
      return {error: true, confirm: true};
    }
    return {};
  }

  // logout
  logout(): void {
    this.tokenService.logOut();
    this.authService.isAuthorized = false;
    this.router.navigateByUrl('/');
  }

  ngOnInit(): void {
  }
}
